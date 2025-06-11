import numpy as np
from collections import deque
from keras import Sequential
import tensorflow as tf
class PolicyTrain :
    #
    def __init__(self,
                DNN, 
                env, 
                min_epsilon = 0.05, 
                gamma = 0.95) :
        self.policy = DNN 
        self.env = env
        self.min_epsilon = min_epsilon
        #the discount factor during the learning process
        self.gamma = gamma
        self.max_buffer_size = 1000
        self.replay_buffer = deque(maxlen = self.max_buffer_size)
        self.possible_actions = 3
        self.reward_single_episode = 0
        self.optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)
    #
    # EPSILON GREEDY POLICY
    def get_action(self, state) :
        if np.random.rand() < self.epsilon :
            action =  np.random.randint(self.possible_actions, dtype=int)
        else : 
            Q_value = self.policy.predict(state[np.newaxis],verbose=0)[0]
            action =  Q_value.argmax()
        return action
    #
    #
    def sample_experiences(self, batch_size):
        indices = np.random.randint(len(self.replay_buffer), size=batch_size)
        batch = [self.replay_buffer[i] for i in indices]
        states, actions, rewards, next_states = zip(*batch)
        states = np.array(states)
        actions = np.array(actions)
        rewards = np.array(rewards)
        next_states = np.array(next_states)
        return states, actions, rewards, next_states
    #
    #
    def trade_once(self, state) :
        action = int(self.get_action(state))
        next_state, reward, done, info = self.env.step(action)
        self.reward_single_episode += reward
        if not done : 
            self.replay_buffer.append((state, action, reward, next_state))
        return next_state, reward, done, info
    #
    def train_step(self, batch_size) :
        states, actions, rewards, next_states = self.sample_experiences(batch_size)
        # states = nparray [batch_size * no.feateures(6)]
        # actions = nparray [batch_size]
        # rewards = nparray [batch_size]
        # next_states = nparray [batch_size * no.feateures(6)]
        next_Q_values = self.policy.predict(next_states, verbose=0) #nparray [batch_size * possible_actions]
        max_next_Q_values = np.max(next_Q_values, axis = 1)# nparray [batch_size]
        # BELLMAN'S EQUATION
        target_Q_values = rewards + (self.gamma * max_next_Q_values)# nparray [batch_size]
        #
        target_Q_values = target_Q_values.reshape(-1,1)
        mask = tf.one_hot(actions, self.possible_actions)
        with tf.GradientTape() as tape :
            all_Q_values = self.policy(states)
            Q_values = tf.reduce_sum(all_Q_values * mask, axis=1, keepdims=True)
            loss = tf.reduce_mean(tf.square(target_Q_values - Q_values))
        
        grads = tape.gradient(loss, self.policy.trainable_variables)
        self.optimizer.apply_gradients(zip(grads, self.policy.trainable_variables))

    #
    def episode_train(self, batch_size = 100, get_log = False) :
        total_gameplay_time = 10
        avg_reward_per_episode = 0
        max_reward = -1*(10**8)
        for episode in range(total_gameplay_time) :
            state = self.env.reset()
            self.reward_single_episode = 0 
            for step in range(self.env.samples) :
                self.epsilon = max(1 - (episode / total_gameplay_time), self.min_epsilon)
                state, reward, done, info = self.trade_once(state)
                if done :
                    break
            avg_reward_per_episode += self.reward_single_episode
            if self.reward_single_episode > max_reward :
                max_reward = self.reward_single_episode
            if  len(self.replay_buffer)>=self.max_buffer_size :
                self.train_step(batch_size)
        
        avg_reward_per_episode /= total_gameplay_time
        return max_reward, avg_reward_per_episode, self.reward_single_episode
    #