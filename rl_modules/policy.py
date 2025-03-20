#this class is very similar to neural network with few tweaks
#creates a policy object for the agent to use inb the environment
import numpy as np
#from layers import * 
from .losses import Losses
from .optimizer import SDG
from collections import deque
class Policy : 
    #
    #contructor to initializde the neural network policy  
    #takes a list of layer objects as a parameter
    def __init__(self, layers, loss='mse') : 
        self.num_layers=len(layers)
        self.layers=layers
        self.J=Losses().get_loss(loss)
        self.set_layer_idx()
        self.init_NN_layer()
        self.possible_actions = layers[self.num_layers - 1].units
        self.replay_buffer = deque(maxlen = 10000)
        
    def set_layer_idx(self) :
        for i in range(self.num_layers) :
            self.layers[i].set_idx(i)
    #
    def init_NN_layer(self) :
        for i in range(1,self.num_layers) :
            self.layers[i].init_layer(self.layers[i-1].n)

    #function for prediction or simply froward propagation
    def predict(self, X) : 
        y_cap=self.layers[0].forward_propagation(X, self)
        return y_cap
    #
    def regularization_cost(self) :
        cost = 0
        for i in range(self.num_layers) :
            cost += self.layers[i].regularization_penalty()
        return cost
    #
    #
    def get_action(self, state, epsilon = 0) :
        if np.random.randn() < epsilon :
            return np.random.randint(self.possible_actions)
        else : 
            Q_value = self.predict(state)
            #probs have the Q value of the possible actions
            #returning the index of the action with maximum Q value
            return np.argmax(Q_value, axis = 1)[0]
    #
    #
    def sample_experiences(self, batch_size):
        indices = np.random.randint(len(self.replay_buffer), size=batch_size)
        batch = [self.replay_buffer[index] for index in indices]
        states, actions, rewards, next_states = [
                    np.array([experience[field_index] for experience in batch])
                    for field_index in range(5)]
        return states, actions, rewards, next_states
    #
    #
    def trade_once(self, env, state, epsilon) :
        action = self.get_action(state, epsilon)
        next_state, reward, logs = env.take_action(action)
        self.replay_buffer.append((state, action, reward, next_state))
        return next_state, reward, logs
    #
    #
    def train_step(self, env, batch_size, epsilon, discount_factor = '0.5',  
                    optimizer = 'sdg', learning_rate = 0.1, decay = 0.001, 
                    momentum = 0, get_log = False) :
        
        self.opt = SDG(learning_rate, decay, momentum)
        #
        #select random sample of experiences from the whole set to prevent correlation during training
        experiences = self.sample_experiences(batch_size)
        states, actions, rewards, next_states = experiences
        #now for each of those experiences we have the next states which are the states that the action taken in that step has lead us into , considering the model works optimally from there on , now we get the Q-values of those next steps,(next_next_steps) 
        #these Q values represent the output of next_next_states
        next_Q_values = self.predict(next_states)
        #considering that the model works optimally after the next states we take on the maximum Q-value from there rejecting the less profitable actions
        next_max_actions = np.argmax(next_Q_values, axis = 1)
        encoded_next_actions = np.zeros((batch_size, self.possible_actions), dtype = float)
        encoded_next_actions[np.arange(batch_size), next_max_actions] = 1
        max_next_Q_values = next_Q_values * encoded_next_actions
        #using bellman's equation to calculate the discounted output Q_value, and this becomes out target value to which out DNN will train to learn
        target_Q_values = rewards + (discount_factor * max_next_Q_values)
        #run optimization step tp 
        all_Q_values = self.predict(states)
        encoded_action = np.zeros((batch_size, self.possible_actions), dtype = float)
        encoded_action[np.arange(batch_size), actions] = 1
        #now the encoded_action is the one-hot encoded vector of the action taken
        Q_cap = all_Q_values * encoded_action
        loss = self.J.compute_cost(Q_cap, target_Q_values)
        grad = self.J.get_grad(Q_cap, target_Q_values)
        self.layers[self.num_layers-1].backward_propagation(grad, self)
        self.opt.pre_update_params()
        for i in range(self.num_layers) :
            self.opt.update_parameters(self.layers[i])
        self.opt.post_update_params()
    #
    def episode_train(self, env) :
        for episode in range(500) :
            env.reset()
            for step in range(8000) :
                eps = max(1 - episode / 400, 0.01)
                state = env.get_current_state()
                next_state, reward, logs = self.trade_once(env, state, epsilon=eps)
            if episode > 50 :
                self.train_step(env, batch_size = 100,epsilon = eps, discount_factor = 0.8)
    #
    #
    #