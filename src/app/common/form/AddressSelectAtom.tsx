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
  Text,
  Flex,
} from '@chakra-ui/react';

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
  touched,
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
    onChange(field, value);
  };

  // Reset the form fields
  const handleReset = () => {
    onChange('province', '');
    onChange('district', '');
  };

  // Generate the address label in the requested format
  const addressLabel = `${values.province ? provinces.find((p) => p.id === values.province)?.full_name : 'Chưa chọn Tỉnh Thành'}, 
    ${values.district ? districts.find((d) => d.id === values.district)?.full_name : 'Chưa chọn Huyện'}, 
    ${values.ward ? wards.find((w) => w.id === values.ward)?.full_name : 'Chưa chọn Xã'}`;

  return (
    <Box style={{ width: '100%', marginBottom: '10px' }}>
      <Flex direction="column" align="stretch" width="100%">
        <Text fontSize="sm" fontWeight="bold" mt={4} mb={2}>
          Địa chỉ đã chọn:
        </Text>

        <Box display="flex" alignItems="center" mb={4}>
          <Box
            width="100%"
            minWidth="350px"
            maxWidth="100%"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            fontSize="sm"
            color="gray.600"
            border="1px solid"
            borderColor="gray.300"
            padding="4px 8px"
            borderRadius="md"
            textAlign="left"
          >
            {addressLabel}
          </Box>
        </Box>

        {/* Nút Chọn Khu Vực */}
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Button width="auto" size="sm" colorScheme="teal">
              Chọn khu vực
            </Button>
          </PopoverTrigger>
          <PopoverContent width="100%" maxWidth="350px" padding={4}>
            <PopoverBody paddingBottom={4}>
              <Grid templateColumns="1fr" rowGap={5}>
                {/* Tỉnh Thành Dropdown */}
                <GridItem colSpan={1}>
                  <FormControl isInvalid={!!(errors.province && touched.province)}>
                    <Select
                      value={values.province}
                      onChange={(e) => handleChange('province', e.target.value)}
                      title="Chọn Tỉnh Thành"
                      isRequired
                      placeholder="-- Chọn Tỉnh Thành --"
                      maxHeight="200px"
                      overflowY="auto"
                      width="100%"
                      menuPlacement="auto"
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
                  <FormControl isInvalid={!!(errors.district && touched.district)}>
                    <Select
                      value={values.district}
                      onChange={(e) => handleChange('district', e.target.value)}
                      title="Chọn Quận Huyện"
                      disabled={!values.province}
                      isRequired
                      placeholder="-- Chọn Quận Huyện --"
                      maxHeight="200px"
                      overflowY="auto"
                      width="100%"
                      maxWidth="250px"
                      menuPlacement="auto"
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
                  <FormControl isInvalid={!!(errors.ward && touched.ward)}>
                    <Select
                      value={values.ward}
                      onChange={(e) => handleChange('ward', e.target.value)}
                      title="Chọn Phường Xã"
                      disabled={!values.district}
                      isRequired
                      placeholder="-- Chọn Phường Xã --"
                      maxHeight="200px"
                      overflowY="auto"
                      width="100%"
                      maxWidth="250px"
                      menuPlacement="auto"
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
      </Flex>
    </Box>
  );
};

export default AddressSelectAtom;
