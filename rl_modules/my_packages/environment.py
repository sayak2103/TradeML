#this class provides an object that acts as a environment for the agent during tarining
import pandas as pd
import numpy as np

class StockEnv : 
    #
    #put the index of the features that the data would have after feature engineering
    open_idx = 0
    close_idx = 3
    vol_idx = 0
    
    def __init__(self, t = 1, capital=1e9) : 
        #recieved data as np array fromat
        # 0 -> training env
        # 1 -> using env
        self.type = t
        self.num_shares = 0
        self.purchase_price = []
        self.capital = 1e9
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
        if(self.current_sample >= self.samples) :
            raise Exception("No more samples")
            return
        return self.data[self.current_sample,:]
    #
    def set_current_state(self, st=None) :
        if(st==None) : 
            self.current_state = self.get_current_state()
        else :
            self.current_state = st
    #
    def take_train_action(self, action) : 
        # action manual
        # 0 -> Buy (B)
        # 1 -> Hold (H)
        # 2 -> Sell (S)
        self.set_current_state()
        if action == 0 :#buying
            if self.capital >= self.current_state[StockEnv.close_idx] :
                logs = "bought share at {price: .2f}".format(price = self.current_state[StockEnv.close_idx])
                reward = -10
                self.capital -= self.current_state[StockEnv.close_idx]
                self.num_shares += 1
                self.purchase_price.append(self.current_state[StockEnv.close_idx])
            else : 
                logs = "insufficient capital , can't buy"
                reward = 0
        elif action == 1 :
            reward = 0
            logs = ""
        elif action == 2 :
            reward = 0
            for i in range(self.num_shares) :
                reward += self.current_state[StockEnv.close_idx] - self.purchase_price[i]
            logs = "sold {num} share at {price: .2f}".format(num = self.num_shares, price = self.current_state[StockEnv.close_idx])
            self.num_shares = 0
        #
        if self.current_sample == self.samples - 1 :
            done = 1
        else : 
            done = 0
        #
        if done==0 : 
            next_state = self.data[self.current_sample + 1,:]
        else :
            next_state = -1
        #
        return next_state, reward, done, logs
    #
    def goto_next_sample(self) :
        self.current_sample += 1