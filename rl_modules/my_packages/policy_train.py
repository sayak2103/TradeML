import numpy as np
from collections import deque
from .optimizer import SDG
class PolicyTrain :
    #
    def __init__(self, DNN, env, epsilon = 0.05, gamma = 0.95) :
        self.policy = DNN # deep neural network that acts as a policy 
        #this class will train this DNN for the given environment
        self.env = env
        #training environment for the DNN to learn
        self.epsilon = epsilon
        #epsilon is needed for making the exploitation and exploration trade-off
        self.gamma = gamma
        #the discount factor during the learning process
        self.max_buffer_size = 1000
        self.replay_buffer = deque(maxlen = self.max_buffer_size)
        self.possible_actions = 3
        self.reward_single_episode = 0
        self.opt = SDG(learning_rate=0.1 , decay=0)
    #
    # EPSILON GREEDY POLICY
    def get_action(self, state) :
        if np.random.randn() < self.epsilon :
            action =  np.random.randint(self.possible_actions, dtype=int)
        else : 
            Q_value = self.policy.predict(state)
            #probs have the Q value of the possible actions
            #returning the index of the action with maximum Q value
            action =  np.argmax(Q_value, axis = 1)[0]
        #print("Action: ", action)
        return action
    #
    #
    def sample_experiences(self, batch_size):
        indices = np.random.randint(len(self.replay_buffer), size=batch_size)
        batch = [self.replay_buffer[index] for index in indices]
        states, actions, rewards, next_states = [
                    np.array([experience[field_index] for experience in batch])
                    for field_index in range(4)]
        return states, actions, rewards, next_states
    #
    #
    def trade_once(self, state) :
        action = int(self.get_action(state))
        reward = self.env.reward_function(action)
        if self.env.goto_next_sample() == False:
            return False
        next_state = self.env.get_current_state()
        self.reward_single_episode += reward
        #print('action:', action , ' reward:', reward)
        self.replay_buffer.append((state, action, reward, next_state))
        return True
    #
    def train_step(self, batch_size) :
        states, actions, rewards, next_states = self.sample_experiences(batch_size)
        # states = nparray [batch_size * no.feateures(6)]
        # actions = nparray [batch_size]
        # rewards = nparray [batch_size]
        # next_states = nparray [batch_size * no.feateures(6)]
        next_Q_values = self.policy.predict(next_states) #nparray [batch_size * possible_actions]
        max_next_Q_values = np.max(next_Q_values, axis = 1)# nparray [batch_size]
        # BELLMAN'S EQUATION
        returns = rewards + (self.gamma * max_next_Q_values)# nparray [batch_size]
        #
        all_Q_values = self.policy.predict(states) # nparray [batch_size * possible_actions]
        target_Q_values = all_Q_values.copy()# nparray [batch_size * possible_actions]
        for i in range(batch_size) :
            target_Q_values[i, actions[i]] = returns[i]
        #grad = self.policy.J.get_grad(target_Q_values , all_Q_values)
        #self.policy.layers[self.policy.num_layers - 1].backward_propagation(grad, self.policy)
        #self.opt.pre_update_params()
        #for i in range(self.policy.num_layers) :
        #    self.opt.update_parameters(self.policy.layers[i])
        #self.opt.post_update_params()
        self.policy.fit(states, target_Q_values, epochs = 1, optimizer = 'adam', learning_rate = 0.1)
    #
    def episode_train(self, batch_size = 100, get_log = False) :
        total_gameplay_time = 1000
        for episode in range(total_gameplay_time) :
            self.env.reset()
            self.reward_single_episode = 0
            for step in range(self.env.samples) :
                self.epsilon = max(1 - (episode / total_gameplay_time), 0.01)
                state = self.env.get_current_state()
                b = self.trade_once(state)
                if b == False :
                    break
            if get_log and episode % (total_gameplay_time // 10) == 0 :
                print("Episode: ", episode, " Reward: ", self.reward_single_episode)
            if  len(self.replay_buffer)>=self.max_buffer_size :
                self.train_step(batch_size)
    #