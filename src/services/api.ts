export default class Api {
    private host = 'http://localhost:8181'

    getHost(): string{
        return this.host;
    }

    getResource(path: string): Promise<any> {
        return new Promise(async (resolve, reject)=>{
            try{
                const response = await fetch(this.host + path);
                const data = await response.json();
                resolve(data);
            } catch(err) {
                reject(err);
            }
        });
    }

    postResource(path: string, data: any, method: string = 'POST'): Promise<any> {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await fetch(this.host + path, {
              method: method,
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            resolve(response.json());
          } catch (err) {
            reject(err);
          }
        });
    }

    deleteResource(path: string): Promise<any> {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(this.host + path, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          resolve(response.json());
        } catch (err) {
          reject(err);
        }
      });
    }
}