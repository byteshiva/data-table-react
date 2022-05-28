const a = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 10000000, 1000000, 100000, 10000, 1000, 100, 10, 1];
const Repeater = () => {
  return (
    <ul>
      {a.map(i => {
        return <li>{i}</li>;
      })}
    </ul>
  );
};

export default Repeater;