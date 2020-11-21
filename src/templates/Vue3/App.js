export default {
  template: `
    <div>
     <h1>Hello Vue3</h1>
     <p>{{ message }}</p>
    </div>
  `,
  data() {
    return {
      message: 'Oh hi from the component',
    };
  },
};
