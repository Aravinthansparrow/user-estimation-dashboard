import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tilt } from 'react-tilt';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const NumberCards = () => {
  const reduxCreated = useSelector((state) => state.estimateList.created);
  const reduxApproved = useSelector((state) => state.estimateList.approved);
  const reduxUnApproved = useSelector((state) => state.estimateList.notapproved);
  const reduxRejected = useSelector((state) => state.estimateList.rejected);
  console.log(reduxApproved);
  const [cardAnimation, setCardAnimation] = useState(false);

  useEffect(() => {
    setCardAnimation(true);
  }, []);

  const percent1 = (reduxUnApproved / reduxCreated) * 100;
  const percent2 = (reduxApproved / reduxCreated) * 100;
  const percent3 = (reduxRejected / reduxCreated) * 100;

  return (
    <div className="card-container">
      <Tilt className={`card card1 ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
        <h3>Created</h3>
        <p>{reduxCreated}</p>
      </Tilt>
      <Tilt className={`card card2 ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
        <h3>UnApproved</h3>
        <div style={{ width: '80px', height: '80px' }}>
          <CircularProgressbar
            value={percent1}
            text={`${reduxUnApproved}`}
            styles={{
              root: {},
              path: {
                stroke: '#1d1d1d'
              },
              text: { fill: 'white', fontWeight: '700', fontSize: '22px' }
            }}
          />
        </div>
      </Tilt>
      <Tilt className={`card card3 ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
        <h3>Approved</h3>
        <div style={{ width: '80px', height: '80px' }}>
          <CircularProgressbar
            value={percent2}
            text={`${reduxApproved}`}
            styles={{
              root: {},
              path: {
                stroke: '#1d1d1d'
              },
              text: { fill: 'black', fontWeight: '700', fontSize: '22px' }
            }}
          />
        </div>
      </Tilt>
      <Tilt className={`card card4 ${cardAnimation ? 'animated slideIn' : ''}`} options={{ max: 25 }}>
        <h3>Rejected</h3>
        <div style={{ width: '80px', height: '80px' }}>
          <CircularProgressbar
            value={percent3}
            text={`${reduxRejected}`}
            styles={{
              root: {},
              path: {
                stroke: '#1d1d1d'
              },
              text: { fill: 'black', fontWeight: '700', fontSize: '22px' }
            }}
          />
        </div>
      </Tilt>
    </div>
  );
};

export default NumberCards;
