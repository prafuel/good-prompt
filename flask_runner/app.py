from flask_cors import CORS
from flask import Flask, request, render_template
from langchain.prompts import PromptTemplate
import json
# import PyPDF2

# nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
ps = PorterStemmer()

from string import punctuation

# llm
from llm import LLM
llm = LLM()

# mongo
from mongodb import MyMongo
mongo = MyMongo()


app = Flask(__name__)
CORS(app)

def output_format(output):
    return {
        "output": output
    }

def preprocessing(text : str) -> str:
    # lowercase
    # remove punctuation symbols
    # remove stopwords
    # stemming

    # text = text.lower()
    text = word_tokenize(text)
    text = [ps.stem(t) for t in text if t not in punctuation and t not in stopwords.words('english')]
    return " ".join(text)

@app.route("/", methods=['get', 'post'])
def main():
    if request.method == "POST":
        user_input = request.json['user1']
        output = llm.refine_prompt(json.loads(user_input)['input'])
        res = llm.model.generate_content(output)
        return output_format(res.text)
    
    return render_template("index.html")


@app.route("/file", methods=['post'])
def get_file():
    extentions = ['pdf', 'csv']

    print(request.files)
    file = request.files['file']
    if file.filename.split(".")[1] in extentions:
        name = "".join(file.filename.split(" ")).lower()
        file.save(name)
        return output_format("File is Accepted, " + name)
    return output_format("plz upload pdf or csv only")


@app.route("/prompt", methods=['post'])
def get_result():
    user_input = request.json['user2']
    # response = llm.model.generate_content(json.loads(user_input)['input'])
    user_input = json.loads(user_input)
    user_input['input'] = preprocessing(user_input['input'])

    response = llm.model.generate_content(json.dumps(user_input))
    return output_format(response.text)

@app.route("/transfer", methods=['post'])
def transfer_prompt():
    user_input = request.json['user1']
    user_input = json.loads(user_input)

    prompt = llm.transfer_prompt(user_input['from_prompt'], user_input['too_prompt'])
    response = llm.model.generate_content(prompt)
    return output_format(response.text)


# handle mongoDB requests
@app.route("/mongo/collection/<collection>", methods=['get'])
def get_collection_data(collection: str):
    res = mongo.get(collection)
    return output_format(res)

if __name__ == "__main__":
    app.run(debug=True, port=8000)
