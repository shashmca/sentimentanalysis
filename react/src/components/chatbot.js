import { Configuration, OpenAIApi } from 'openai';
import { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, Input } from '@mui/material';
import PropTypes from 'prop-types';

export const ChatBot = (props) => {
    const [reply, updateReply] = useState('');
    const config = new Configuration({
        organization: 'org-aRAe4TSpaU6a8nky8YGtInFC',
        apiKey: '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'
    });
    delete config.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(config);

    const input = 'provide me 3 options on how Adidas can boost customer experience based on sentiment analysis report';

    useEffect(() => {
        console.log('rendering');
        const storedResponse = localStorage.getItem('genAIResponse')
        if(!storedResponse){
        const getAIReply = async () => {
            console.log('api claling');
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{"role": "system", "content": "You are a helpful assistant"}, {role: "user", content: input}]
            });
            console.log('api respose getting');
            updateReply(response.data.choices[0].message.content);
            localStorage.setItem('genAIResponse', response.data.choices[0].message.content)
        }

        getAIReply();}
        updateReply(storedResponse);
    }, [])
    
    useEffect(()=>{

        console.log('reply updated');
    },[reply])
    // const handleClick = () => {
        
    //   }

    return (
        // <>
        //     <Button className="fetch-ai-suggestions" onClick={()=> handleClick()}>abc</Button>
        //     {<Input type='text' onChange={(e) => setInput(e.target.value)}/>}
        //     {reply && <div>{reply}</div>}
        // </>
        <Card sx={props.sx}>
            <CardHeader title="AI Suggestions" />
            <CardContent>
                <div dangerouslySetInnerHTML={{__html: reply}} style={{whiteSpace: 'pre-wrap'}}></div>
            </CardContent>
        </Card>
    );
}

ChatBot.protoTypes = {
    sx: PropTypes.object
}