import './title.scss'

const Title = ({ children, lvl }) => {
    if (lvl===1) {
      return <h1 className="title">{children}</h1>;
    } else {
      return <h2 className="title">{children}</h2>;
    }
    
  };

export default Title;