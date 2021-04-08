import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AUTH_TOKEN } from '../back-end/src/constants';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const authToken = localStorage.getItem(AUTH_TOKEN);

        if(authToken !== undefined){
            router.push(`/home`);
        } else {
            router.push(`/login`);
        }
    }, []);

    return <div/>
}
