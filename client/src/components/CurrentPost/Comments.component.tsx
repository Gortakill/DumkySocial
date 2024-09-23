'use client';

import { getAnswers, getComments } from '@/axios/GetAxios';
import { Answer, Comment } from '@/types/types';
import { useEffect, useState } from 'react';
import { AnswerComponent } from './Answer.components';

export const Comments = ({ id }: { id: number }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);

    const getAllComments = async () => {
        const { data } = await getComments(id);
        setComments(data);
    };

    useEffect(() => {
        getAllComments();
    }, []);

    const handleAnswer = async (commentId: number) => {
        const { data } = await getAnswers(commentId);
        setAnswers(data);
    };

    return (
        <>
            {comments.map((comment: Comment) => (
                <section
                    className="flex flex-col items-center ml-5 mt-5"
                    key={comment.id}
                >
                    <div className="flex w-full justify-center">
                        <p className="w-1/3 text-start">
                            {comment.userId} : {comment.text}
                        </p>
                        <button
                            onClick={() => handleAnswer(comment.id)}
                            className="text-blue-400 ml-5 relative flex w-1/6 hover:text-blue-100 transition-colors duration-300 ease-in-out"
                        >
                            Answers
                        </button>
                    </div>
                    <AnswerComponent answers={answers} commentId={comment.id} />
                </section>
            ))}
        </>
    );
};
