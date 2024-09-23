import { CurrentPost } from '@/components/CurrentPost/CurrentPost.components';

type Props = {
    params: {
        id: number;
    };
};

export default function ({ params: { id } }: Props) {
    return (
        <main>
            <CurrentPost id={id} />
        </main>
    );
}
