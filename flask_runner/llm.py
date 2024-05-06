import google.generativeai as genai
from langchain.prompts import PromptTemplate

import json
import os

from dotenv import load_dotenv

prompts = json.load(open("prompts.json", 'r'))


class LLM:
    def __init__(self) -> None:
        load_dotenv()
        genai.configure(api_key=os.environ['GOOGLE_GEMINI_TOKEN'])
        self.model = genai.GenerativeModel('gemini-pro')

    def refine_prompt(self, message: str):
        # print(prompts)
        template = prompts['prompts']['refine']
        prompt = PromptTemplate(template=template, input_variables=['message'])
        return prompt.format(message=message)
    
    def generate_prompt(self, user_input: dict):
        template = prompts['prompts']['generate']
        prompt = PromptTemplate(template=template, input_variables=['user_input'])
        return prompt.format(user_input=user_input)

    def transfer_prompt(self, from_prompt: str, too_prompt: str):
        template = prompts['prompts']['transfer']
        prompt = f'from_prompt={from_prompt}, too_prompt={too_prompt}, {template}'                                                                                              

        print(prompt)
        return prompt
