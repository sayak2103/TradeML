import datetime
import requests
import pytz
import time
import os.path
import pandas as pd
import numpy as np
from my_packages.policy_train import PolicyTrain
from my_packages.environment import StockEnv

def train_model(
        policy,
        start_date, 
        end_date, 
        company, 
        headers,
        log_file=None,
        get_log=False,
        sleep_time=0.1):
    """ 
    Function to train the model for a given range of dates and a specific company.
    Args:
        policy (NN): The neural network policy to be trained.
        start_date (datetime): The starting date for training.
        end_date (datetime): The ending date for training.
        company (str): The stock symbol of the company to train on.
        headers (dict): Headers for the API request.
        log_file (str, optional): Path to the log file. Defaults to None.
        get_log (bool, optional): Whether to return logs. Defaults to False.
        sleep_time (float, optional): Time to sleep(in seconds) between API requests. Defaults to 0.1 seconds.
    Returns:
        None: The function does not return anything, but it trains the model and prints training information, if `get_log` is True.
    """
    if(log_file is not None):
        #check if the log file exists, if not create it
        if not os.path.exists(log_file):
            if(get_log):
                print(f"Log file {log_file} does not exist, creating a new one.")
            file = open(log_file, 'w')
        else:
            file = open(log_file, 'a')
        
        file.write(f"traning on {policy.name}\n")
        file.write(f"Date : {datetime.datetime.now()},traing started for {company} from {start_date} to {end_date}\n")
    
    counter = 1
    while(start_date < end_date) :
        #random limit for the number of minutes to train E [50,100]
        limit = np.random.randint(50, 100)
        next_time = start_date + datetime.timedelta(minutes=limit)
        #get data from api
        json_data = get_API_data(
            start_timestamp=start_date,
            company=company,
            headers=headers,
            limit=limit,
        )
        #if no data is returned, skip to the next iteration
        if not json_data or 'bars' not in json_data or company not in json_data['bars']:
            if(get_log):
                print(f"No data found for {company} from {start_date} to {next_time}. Skipping...")
            start_date = next_time
            continue
        #processing the data
        X = process_API_data(
            data=json_data,
            company=company,
        )
        #environment setup
        env = StockEnv()
        env.set_env_data(X)#set the data to the environment
        #training tool setup
        training_tool = PolicyTrain(policy,env,min_epsilon=0.01,gamma=0.9)
        #training tool training
        max_reward , avg_reward_per_episode , final_reward = training_tool.episode_train(batch_size=400, get_log=get_log)
        if(get_log):
            print(f"from {start_date} for {limit}mins of {company} => reward : max : {max_reward:.3f},avg : {avg_reward_per_episode:.3f}, final : {final_reward:.3f}")
        if( log_file is not None):
            file.write(f"{counter}.  from {start_date} for {limit}mins of {company} => reward -> max : {max_reward:.3f},avg : {avg_reward_per_episode:.3f}, final : {final_reward:.3f}\n")
        #updating start_date for the next iteration
        start_date = next_time
        #sleep to allow cpu to cool down
        if sleep_time > 0 :
            time.sleep(sleep_time)
        counter += 1
    #
    if(log_file is not None):
        file.write("\n")
        file.close()

def get_API_data(
        start_timestamp: datetime.datetime,
        company: str,
        headers: dict,
        limit: int = 200,
    ) :
    """
    Fetches data from an API within a specified time range for a given company.
    Args:
        start_timestamp (datetime.datetime): Start of the time range.
        company (str): The company for which data is to be fetched.
        headers (dict): Headers to be used in the API request.
        limit (int): Maximum number of records to fetch in one request. Default is 200.
    Returns:
        dict: JSON response from the API containing the data.
    """
    #conversion to UTC
    utc_start_time = pytz.utc.localize(start_timestamp)
    #conversion to rc3339 format as accepted by ALPACA API
    rc3339_start = utc_start_time.isoformat()
    #conversion to UTC end time
    utc_end_time = utc_start_time + datetime.timedelta(minutes=limit)
    rc3339_end = utc_end_time.isoformat()
    url = f"https://data.alpaca.markets/v2/stocks/bars?symbols={company}&timeframe=1Min&start={rc3339_start[:19]+'Z'}&end={rc3339_end[:19]+'Z'}&limit={limit}&adjustment=raw&feed=sip&sort=asc"
    response = requests.get(url, headers=headers)
    json_data = response.json()
    return json_data

def process_API_data(
        data,
        company: str
    ):
    """
    Processes the JSON data fetched from the API.
    Args:
        data (dict): The JSON data to be processed.
        company (str): The company for which the data is processed.
    Returns:
        dataframe: Processed data in a pandas DataFrame format.
    """
    #dataframe creation
    df = pd.DataFrame(data['bars'][f'{company}'])
    #data preprocessing
    training_df = pd.DataFrame()
    training_df.insert(0,'co',((df['c'] - df['o'] )*100/ df['o']), allow_duplicates=True)
    training_df.insert(1,'hl',((df['h'] - df['l'] )*100/ df['o']), allow_duplicates=True)
    training_df.insert(2,'ho',((df['h'] - df['o'] )*100/ df['o']), allow_duplicates=True)
    training_df.insert(3,'ol',((df['o'] - df['l'] )*100/ df['o']), allow_duplicates=True)
    training_df.insert(4,'c',(df['c']/1000),allow_duplicates=True)
    training_df.insert(5,'vol',(df['v']/10000), allow_duplicates=True)

    X = training_df.to_numpy()# numpy array prepared of corresponding dataframe
    return X
