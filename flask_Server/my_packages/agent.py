#gives a agent object with uses a policy to act on the environment 
#Should be used iin both training and usage spaces
class Agent : 
    def __init__(self, env, policy) : 
        self.env = env
        self.policy = policy