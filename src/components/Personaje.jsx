export const Personaje = ({ character = [] }) => {
  return (
    <div className="row">
      {character.map((item, index) => (
        <div key={index} className="col mb-1">
          <div className="card mt-4" style={{ width: 200 }}>
            <img src={item.image} alt="" />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <hr />
              <p>Location: {item.location.name}</p>
              <p>Species: {item.species}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
