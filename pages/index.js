import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const authToken = localStorage.getItem('AUTH_TOKEN');

        if(authToken !== undefined && authToken !== null){
            router.push(`/home`);
        } else {
            router.push(`/login`);
        }
    }, []);

    return <div/>
}
