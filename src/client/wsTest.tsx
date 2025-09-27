import { createResource } from 'solid-js';
import { trpcWSClient } from './trpc-ws.client';

export default function wsTest() {

    const [wsPingResult] = createResource(async () => {
        return await trpcWSClient.wsping.query();
    });
    
    return <div>WS Ping Result: {wsPingResult()}</div>;
}