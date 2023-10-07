const { app } = require('@azure/functions');

app.http('function1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        // const ip = request.ip;
        // const userAgent = request.headers['user-agent'];

         const response = await fetch('https://ipinfo.io/json');
         if (!response.ok) {
          throw new Error('Network response was not ok');
         }
        const data = await response.json();

        const response2 = await fetch('https://api-bdc.net/data/client-info');
        if (!response2.ok) {
         throw new Error('Network response was not ok');
        }
        const data2 = await response2.json();


        return { jsonBody: {data, data2} };
    }
});
