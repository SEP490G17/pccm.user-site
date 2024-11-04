import { Breadcrumb, Divider } from 'antd';
import { Link, useLocation } from 'react-router-dom';

interface IProp {
  breadCrumb: {
    title: string;
    to?: string;
  }[];
}

function PageHeadingAtoms({ breadCrumb }: IProp) {
  const location = useLocation();

  return (
    <div>
      <Breadcrumb >
        {breadCrumb.map(({ title, to }, index) => (
          <Breadcrumb.Item key={index}>
            <Link to={to || '/'} style={{ textDecoration: 'none', color: location.pathname === to ? 'black' : 'inherit' }}>
              {title}
            </Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <Divider style={{ background: 'linear-gradient(90deg, #00423D 0%, #0A3351 100%)', height: '1px', marginBottom: '32px', width: '150px' }} />
    </div>
  );
}

export default PageHeadingAtoms;
