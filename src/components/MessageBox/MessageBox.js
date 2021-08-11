export default function MessageBox(props) {
  return (
    <div className={`alert alerts-${props.variant || 'info'}`}>
      {props.children}
    </div>
  );
}
