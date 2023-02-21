import React from 'react';
import { useState } from 'react';
import AcountPopover from './AcountPopover';
import { acountList } from '~/utils/constant';



const AcountMenu = ({handleClloseAcount}) => {
  const [ history, setHistory ] = useState([{data: acountList}])
  const current = history[history.length - 1]
  return (
    <><AcountPopover handleClloseAcount={handleClloseAcount}  data={current} setHistory={setHistory}/></>
  );
};

export default AcountMenu;
