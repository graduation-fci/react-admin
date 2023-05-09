import React ,{useState} from 'react'

import {AnimateSharedLayout } from 'framer-motion'
const Card = (props) => {
    const [expanded, setExpanded] = useState(false);
    return (
      <AnimateSharedLayout>
        {expanded ? (
          "expanded"
        ) : (
          <CompactCard param={props}  />
        )}
      </AnimateSharedLayout>
    );
  };
  
  // Compact Card
  function CompactCard({ param, setExpanded }) {
    const Png = param.png;
    return (
      
      <div className="CompactCard">
    
        <div className="radialBar">
          
        <div className="detail">
          <Png />
          <span>${param.value}</span>
          <span>Last 24 hours</span>
          </div>
          </div>
          </div>
 );
 }
export default Card
