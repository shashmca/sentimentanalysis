import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import { Button, Input } from '@mui/material';

export const ChatBot = () => {
    const [reply, updateReply] = useState('');
    const config = new Configuration({
        organization: 'org-aRAe4TSpaU6a8nky8YGtInFC',
        apiKey: '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'
    });
    delete config.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(config);

    const [input, setInput] = useState('Bot user')

    const handleClick = () => {
        const getAIReply = async () => {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{"role": "system", "content": "You are a helpful assistant"}, {role: "user", content: input}]
            });
            updateReply(response.data.choices[0].message.content);
        }
        getAIReply();
      }

    return (
        <>
            <Button className='shub' onClick={()=> handleClick()}>abc</Button>
            {<Input type='text' onChange={(e) => setInput(e.target.value)}/>}
            {reply && <div>{reply}</div>}
        </>
    );
}