import { Configuration, OpenAIApi } from 'openai';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CircularProgress } from '@mui/material';
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
    const storedResponse = localStorage.getItem('genAIResponse')

    useEffect(() => {
        console.log('rendering');

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
            getAIReply();
        }
        updateReply(storedResponse);
    }, [])
    
    useEffect(()=>{

        console.log('reply updated');
    },[reply])

    return (
        <Card sx={props.sx}>
            <CardHeader title="AI Suggestions" />
            <CardContent>
                {!storedResponse && <div style={{display: 'flex', justifyContent: 'center'}}>{<CircularProgress />}</div>}
                <div dangerouslySetInnerHTML={{__html: reply}} style={{whiteSpace: 'pre-wrap'}}></div>
            </CardContent>
        </Card>
    );
}

ChatBot.protoTypes = {
    sx: PropTypes.object
}