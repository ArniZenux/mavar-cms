export class getData {
  helloWorld(){
    return 'hello world';
  }
  async getOrderList(){
    const res = await fetch('order.json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
  }
}