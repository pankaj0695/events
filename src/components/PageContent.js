import { Link } from 'react-router-dom';

import classes from './PageContent.module.css';

function PageContent({ title, children, button }) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
      {button && (
        <Link className={classes.button} to="events">
          Explore our events
        </Link>
      )}
    </div>
  );
}

export default PageContent;
