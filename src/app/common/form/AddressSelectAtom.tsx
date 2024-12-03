import { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  Grid,
  GridItem,
  FormErrorMessage,
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react';
import { FaLocationDot } from "react-icons/fa6";
import { Input } from 'antd';
interface Province {
  id: string;
  full_name: string;
}

interface District {
  id: string;
  full_name: string;
}

interface Ward {
  id: string;
  full_name: string;
}

interface AddressSelectAtomProps {
  onChange: (field: string, value: string) => void;
  values: {
    province: string;
    district: string;
    ward: string;
    address: string;
  };
  errors: {
    province: string;
    district: string;
    ward: string;
    address: string;
  };
  touched: {
    province: boolean;
    district: boolean;
    ward: boolean;
    address: boolean;
  };
}

const AddressSelectAtom: React.FC<AddressSelectAtomProps> = ({
  onChange,
  values,
  errors,
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  // Fetch provinces on mount
  useEffect(() => {
    const fetchProvincesData = async () => {
      const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
      const data = await response.json();
      if (data.error === 0) {
        setProvinces(data.data);
      }
    };

    fetchProvincesData();
  }, []);

  // Fetch districts based on selected province
  useEffect(() => {
    if (values.province) {
      const fetchDistrictsData = async (provinceId: string) => {
        const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
        const data = await response.json();
        if (data.error === 0) {
          setDistricts(data.data);
        }
      };

      fetchDistrictsData(values.province);
    } else {
      setDistricts([]);
    }
  }, [values.province]);

  // Fetch wards based on selected district
  useEffect(() => {
    if (values.district) {
      const fetchWardsData = async (districtId: string) => {
        const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
        const data = await response.json();
        if (data.error === 0) {
          setWards(data.data);
        }
      };

      fetchWardsData(values.district);
    } else {
      setWards([]);
    }
  }, [values.district]);

  // Handle changes in each select field
  const handleChange = (field: string, value: string) => {
    switch (field) {
      case 'province':
        onChange('province', value);
        onChange('district', '');
        onChange('ward', '');
        break;
      case 'district':
        onChange('district', value);
        onChange('ward', '');
        break;
      case 'ward':
        onChange('ward', value);
        break;
      default:
        onChange(field, value);
    }
  };

  // Reset the form fields
  const handleReset = () => {
    onChange('province', '');
    onChange('district', '');
    onChange('ward', '');
  };

  // Generate the address label in the requested format
  const addressLabel = (values.province || values.district || values.ward)
    ? `${provinces.find((p) => p.id === values.province) ? provinces.find((p) => p.id === values.province)?.full_name : ""}${districts.find((d) => d.id === values.district) ? `, ${districts.find((d) => d.id === values.district)?.full_name}` : ""} ${wards.find((w) => w.id === values.ward) ? `, ${wards.find((w) => w.id === values.ward)?.full_name}` : ""}`
    : 'Chọn khu vực';

  return (
    <Box style={{ width: '100%' }}>
      <Box display="flex" alignItems="center">
        <Popover placement="bottom-end">
          <Input
            readOnly
            value={addressLabel}
            style={{
              width: '100%',
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: 'sm',
              color: 'gray.600',
              borderColor: 'gray.300',
              borderRadius: 'md',
            }}
            addonAfter={
              <PopoverTrigger>
                <Box display="flex" alignItems="center" cursor="pointer">
                  <FaLocationDot style={{ color: 'gray', cursor: 'pointer' }} />
                </Box>
              </PopoverTrigger>
            }
          />
          <PopoverContent width="100%" maxWidth="350px" padding={4}>
            <PopoverBody paddingBottom={4}>
              <Grid templateColumns="1fr" rowGap={5}>
                {/* Tỉnh Thành Dropdown */}
                <GridItem colSpan={1}>
                  <FormControl>
                    <Select
                      value={values.province}
                      onChange={(e) => handleChange('province', e.target.value)}
                      placeholder="-- Tỉnh Thành --"
                      maxHeight="100px"
                      overflowY="auto"
                      width="100%"
                    >
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.full_name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{errors.province}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                {/* Quận Huyện Dropdown */}
                <GridItem colSpan={1}>
                  <FormControl>
                    <Select
                      value={values.district}
                      onChange={(e) => handleChange('district', e.target.value)}
                      disabled={!values.province}
                      placeholder="-- Quận Huyện --"
                      overflowY="auto"
                      width="100%"
                    >
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.full_name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{errors.district}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                {/* Phường Xã Dropdown */}
                <GridItem colSpan={1}>
                  <FormControl>
                    <Select
                      value={values.ward}
                      onChange={(e) => handleChange('ward', e.target.value)}
                      disabled={!values.district}
                      placeholder="-- Phường Xã --"
                      overflowY="auto"
                      width="100%"
                    >
                      {wards.map((ward) => (
                        <option key={ward.id} value={ward.id}>
                          {ward.full_name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{errors.ward}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                {/* Đặt lại button */}
                <GridItem colSpan={1}>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={handleReset}
                    position="absolute"
                    bottom="10px"
                    right="10px"
                  >
                    Đặt lại
                  </Button>
                </GridItem>
              </Grid>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  );
};

export default AddressSelectAtom;
