from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
ps = PorterStemmer()

from string import punctuation

def preprocessing(text : str) -> str:
    # lowercase
    # remove punctuation symbols
    # remove stopwords
    # stemming

    text = text.lower()
    text = word_tokenize(text)
    text = [ps.stem(t) for t in text if t not in punctuation and t not in stopwords.words('english')]
    return " ".join(text)


string = "#Write a dialogue between two characters who discover a hidden portal in their backyard."
print(preprocessing(string))