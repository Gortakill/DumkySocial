import { createAnswer } from '@/axios/PostAxios';
import { Answer } from '@/types/types';
import { SendHorizontal } from 'lucide-react';
import { useState } from 'react';

interface Props {
    answers: Answer[];
    commentId: number;
}

export const AnswerComponent = ({ answers, commentId }: Props) => {
    const [value, setValue] = useState('');

    const sendAnswer = async () => {
        if (value !== '') {
            await createAnswer(value, commentId);
            setValue('');
        }
        return;
    };
    return (
        <>
            {answers.map((answer: Answer) => {
                if (answer.commentId === commentId) {
                    return (
                        <div
                            className="flex flex-col mx-auto w-1/2 mt-5"
                            key={answer.id}
                        >
                            <div className="w-full bg-blue-200" key={answer.id}>
                                {answer.userId}: {answer.text}
                            </div>
                        </div>
                    );
                }
                return;
            })}
            <div className="flex items-center mt-5 w-1/2">
                <input
                    type="text"
                    placeholder="Enter your answer"
                    className="w-full border-solid border-2 border-blue-200 focus:border-blue-400 
                outline-none transition-colors duration-200 ease-linear"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    onClick={sendAnswer}
                    className="disabled:text-gray-500 hover:text-blue-400 transition-colors 
                duration-200 ease-in-out"
                >
                    <SendHorizontal />
                </button>
            </div>
        </>
    );
};
