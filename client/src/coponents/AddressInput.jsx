import React, { useState } from 'react';
import {
  ThailandAddressTypeahead,
  ThailandAddressValue,
} from 'react-thailand-address-typeahead';

const AddressInput = () => {
  const [address, setAddress] = useState(ThailandAddressValue.empty());

  return (
    <div>
      <ThailandAddressTypeahead
        value={address}
        onValueChange={(val) => setAddress(val)}
      >
        <ThailandAddressTypeahead.SubdistrictInput placeholder="ตำบล / แขวง" />
        <ThailandAddressTypeahead.DistrictInput placeholder="อำเภอ / เขต" />
        <ThailandAddressTypeahead.ProvinceInput placeholder="จังหวัด" />
        <ThailandAddressTypeahead.PostalCodeInput placeholder="รหัสไปรษณีย์" />
        <ThailandAddressTypeahead.Suggestion />
      </ThailandAddressTypeahead>
    </div>
  );
};

export default AddressInput;
