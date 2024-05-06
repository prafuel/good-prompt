from pymongo import MongoClient

from dotenv import load_dotenv
import os

load_dotenv()

url = os.environ['MONGO_URL']
db = os.environ['DB']

class MyMongo:
    def __init__(self) -> None:
        client = MongoClient(url)
        self.db = client[db]
    
    def get(self, collection:str) -> list:
        data = self.db[collection]
        # print(data.find()[0]['index'])

        list = []
        for i in data.find():
            i.pop('_id')
            list.append(i)

        return list

if __name__ == "__main__":
    obj = MyMongo()
    l = obj.get('randomInput')
    # print(l[0])