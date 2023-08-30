
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';


const model = new OpenAI({
  openAIApiKey: "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",
  temperature: 0,
});


const template1 = "Provide 5 hidden gem restaurants that are affordable to do in the city inputted. Provide a short description of Restaurants using unique adjectives and 3 relevant emojis your response. Your response should be bulleted and in list format.\n City: {city}";
const prompt1 = new PromptTemplate({ template: template1, inputVariables: ['city'] });
const chain1 = new LLMChain({ llm: model, prompt: prompt1 });

const template2 = "Provide 5 affordable restaurants to visit in the city inputted. Provide a short description of the restaurant using unique adjectives and 3 relevant emojis your response. Your response should be bulleted and in list format.\n City: {city}";
const prompt2 = new PromptTemplate({ template: template2, inputVariables: ['city'] });
const chain2 = new LLMChain({ llm: model, prompt: prompt2 });

const template3 = "Provide 5 fancy and highend restaurants that are super popular to visit in the city inputted. Provide a short description of the restaurant using unique adjectives and 3 relevant emojis your response. Your response should be bulleted and in list format.\n City: {city}";
const prompt3 = new PromptTemplate({ template: template3, inputVariables: ['city'] });
const chain3 = new LLMChain({ llm: model, prompt: prompt3 });

const template4 = "Provide 5 breathtaking views that are not too touristy to do in the city inputted. Provide a short description of the view using unique adjectives and emojis your response. Your response should be bulleted and in list format.\n City: {city}";
const prompt4 = new PromptTemplate({ template: template4, inputVariables: ['city'] });
const chain4 = new LLMChain({ llm: model, prompt: prompt4 });

const template5 = "Provide 5 popular nightlife venues that are modern to visit in the city inputted. Provide a short description of the club/lounge/bar using unique adjectives and emojis your response. Your response should be bulleted and in list format.\n City: {city}";
const prompt5 = new PromptTemplate({ template: template5, inputVariables: ['city'] });
const chain5 = new LLMChain({ llm: model, prompt: prompt5 });

const template6= "Provide 5 local bars that have a young crowd but are frequented by locals to visit in the city inputted. Provide a short description of the bar using unique adjectives and emojis your response. Your response should be bulleted and in list format.\n City: {city}";
const prompt6 = new PromptTemplate({ template: template6, inputVariables: ['city'] });
const chain6 = new LLMChain({ llm: model, prompt: prompt6 });

const Search = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [aiResponses, setAiResponses] = useState([null, null, null, null, null, null]);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitClicked(true); 
    const userMessage = e.target.userMessage.value;
    setMessages([{ text: userMessage, sender: 'user' }, ...messages]);
    setAiResponses([null, null, null, null, null, null]);
    
    const chains = [chain1, chain2, chain3, chain4, chain5, chain6];
    const results = await Promise.all(chains.map(chain => chain.call({ city: userMessage })));
    setAiResponses(results);
  };
  

  const cardTitles = ["Hidden Gem Food:", "Affordable Food:", "Fancy Food:", "Breathtaking Views:", "Nightlife:", "Local Bars:"];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card chatbox">
            <h3 className="text-center card-header">
              Where are you visiting, {username}?
            </h3>
            <form onSubmit={handleMessageSubmit} className="d-flex p-2 border-bottom">
              <input
                type="text"
                name="userMessage"
                className="form-control mr-2"
                placeholder="✈️ Type a city! ✈️"
              />
              <button type="submit" className="btn btn-primary">
                Go!
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Answer Cards */}
      <div className="row">
        {cardTitles.map((title, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                  {
                    aiResponses[index] 
                      ? aiResponses[index].text 
                      : (isSubmitClicked ? "Loading..." : "")
                  }
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapStateToProps)(Search);
