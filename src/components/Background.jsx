import DotGrid from '../ui/DotGrid';

const Background = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
  <DotGrid
    dotSize={5}
    gap={18}
    baseColor="#2B1F39"
    activeColor="#00B4D8"
    proximity={100}
    shockRadius={200}
    shockStrength={3}
    resistance={500}
    returnDuration={1.25}
  />
</div>
  );
};

export default Background;