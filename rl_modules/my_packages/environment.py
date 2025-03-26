#this class provides an object that acts as a environment for the agent during tarining
import pandas as pd
import numpy as np

class StockEnv : 
    #
    #put the index of the features that the data would have after feature engineering
    open_idx = 0
    high_idx = 1
    low_idx = 2
    close_idx = 3
    vol_idx = 4
    avg_price_idx = 5
    
    def __init__(self) : 
        self.num_shares = 0
        self.purchase_price = []
        self.avg_price = 0
    #
    def set_env_data(self, data) :
        self.data = data
        self.samples = len(data)
        self.current_sample = 0
    #
    def reset(self) : 
        self.current_sample = 0;
    #
    def get_current_state(self) : 
        return np.append(self.data[self.current_sample,:], self.avg_price)
    #
    def reward_function(self, action) :
        reward = 0.
        close_price = self.data[self.current_sample,StockEnv.close_idx]
        if action == 0  : #BUY
            reward = -0.3
            self.num_shares += 1;
            self.purchase_price.append(close_price)
        elif action == 1 : #HOLD
            pass
        elif self.num_shares==0 :
            pass
        else : #SELL
            profit = self.num_shares * (close_price - self.avg_price)
            self.num_shares = 0
            self.avg_price = 0
            if profit > 0 :
                reward += 1
            elif profit == 0 :
                reward += 0
            else :
                reward -= 10
        return reward
    #
    def goto_next_sample(self) :
        if self.current_sample < self.samples-1 :
            self.current_sample += 1
            return True
        else :
            return False
    