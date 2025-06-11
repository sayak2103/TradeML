#this class provides an object that acts as a environment for the agent during tarining
import pandas as pd
import numpy as np

class StockEnv : 
    #
    #put the index of the features that the data would have after feature engineering
    co_idx = 0
    hl_idx = 1
    ho_idx = 2
    ol_idx = 3
    close_idx = 4
    vol_idx = 5
    
    def __init__(self) : 
        self.num_shares = 0
        self.total_invested = 0
        self.capital = 0
        self.init_capital = 0
        self.tax = 0
        self.inflation = 0
        self.total_asset = 0
        self.avg_price = 0
    #
    def set_env_data(self, data) :
        self.data = data
        self.samples = len(data)
        self.current_sample = 0
    #
    def reset(self) : 
        self.current_sample = 0
        self.num_shares = 0
        self.total_invested = 0
        self.capital = 0
        self.init_capital = 0
        self.total_asset = 0
        self.avg_price = 0
        return self.data[self.current_sample]
    #
    def step(self, action) :
        reward = 0.
        close_price = self.data[self.current_sample,StockEnv.close_idx] * 1000
        if action == 0  : #BUY
            self.num_shares += 1
            self.capital -= close_price
            self.total_invested += close_price
            self.capital -= self.tax
        elif action == 1 : #HOLD
            pass
        elif self.num_shares==0 :
            pass
        else : #SELL
            SP = self.num_shares * close_price
            #CP = total_invested
            self.capital += SP
            self.num_shares = 0
            self.total_invested = 0
        #
        self.capital -= self.inflation
        self.total_asset = self.capital + (self.num_shares * close_price)
        change = self.total_asset - self.init_capital
        if(change >= 0) :
            reward += min((change/10) , 50)
        else :
            reward += max((change/10) , -50)
        
        info = {
            'action' : action,
            'capital': self.capital,
            'num_shares': self.num_shares,
            'total_asset': self.total_asset,
            'avg_price': self.avg_price,
            'change': change
        }
        
        if(self.current_sample == self.samples - 1) :
            done = True
            next_sample = None
        else :
            done = False
            next_sample = self.data[self.current_sample + 1]
            self.current_sample += 1
        
        return next_sample, reward, done, info
    #