const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-BWAx5H3GxseFkiTKiTKAtz3M",
    apiKey: process.env.OPENAI_API_KEY||'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',
});
const openai = new OpenAIApi(configuration);
const response =  openai.listEngines();
module.exports = {
  response
}