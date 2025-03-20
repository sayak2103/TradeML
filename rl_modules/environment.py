#this class provides an object that acts as a environment for the agent during tarining
import pandas as pd
import numpy as np

class StockEnv : 
    #
    def __init__(self, data) : 
        #recieved data as np array fromat
        self.samples = len(data)
        self.current_sample = 0
        