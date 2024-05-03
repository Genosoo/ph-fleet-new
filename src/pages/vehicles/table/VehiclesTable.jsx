import useDataStore from "../../../context/useDataStore"
import {  useEffect, useState } from "react"
import { Table, Input, Button, Space,Spin,  Popconfirm} from "antd";
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import GetToken from "../../../components/token/GetToken";

export default function VehiclesTable() {
  const { vehiclesData, fetchData, deleteVehicle, loading } = useDataStore();
  const [filteredData, setFilteredData] = useState([]);
  const csrfToken = GetToken()

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
    setFilteredData([]); 
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setFilteredData(
      vehiclesData.filter((item) =>
        item.vehicle_name.toLowerCase().includes(selectedKeys[0].toLowerCase()) ||
        item.vehicle_code.toLowerCase().includes(selectedKeys[0].toLowerCase()) ||
        item.office_details?.office_address.toLowerCase().includes(selectedKeys[0].toLowerCase()) || 
        item.office_details?.office_name.toLowerCase().includes(selectedKeys[0].toLowerCase()) ||
        item.office_details?.camp_base.toLowerCase().includes(selectedKeys[0].toLowerCase()) ||
        item.unit_details?.unit_name.toLowerCase().includes(selectedKeys[0].toLowerCase()) 
      )
    );
  };

  const handleDelete = async (vehicleId) => {
    try {
      await deleteVehicle(vehicleId, csrfToken);
      setFilteredData([])
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };


  console.log("vehicles data:", vehiclesData)

  const columns = [
    {
      title: 'Vehicle Code',
      dataIndex: 'vehicle_code',
      key: 'vehicle_code',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Vehicle Code"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
         
            <Button
              type=""
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            
            <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => (record.office_code || '').toLowerCase().includes(value.toLowerCase()),
    },
    
    {
    
      title: 'Vehicle Name',
      dataIndex: 'vehicle_name',
      key: 'vehicle_name',
      showSorterTooltip: {
        target: 'full-header',
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Vehicle Name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
         
            <Button
              type=""
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            
            <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => record.vehicle_name.toLowerCase().includes(value.toLowerCase()),
      sorter: (a, b) => a.vehicle_name.length - b.vehicle_name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Office Name',
      dataIndex: 'office_details.office_name',
      key: 'office_details.office_name',
      render: (text, record) => record.office_details ? record.office_details.office_name : 'N/A',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Office Address"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
         
            <Button
              type=""
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            
            <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => (record.office_details.office_name || '').toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Office Address',
      dataIndex: 'office_details.office_address',
      key: 'office_details.office_address',
      render: (text, record) => record.office_details ? record.office_details.office_address : 'N/A',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Office Address"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
         
            <Button
              type=""
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            
            <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => (record.office_details.office_address || '').toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Camp Base',
      dataIndex: 'office_details.camp_base',
      key: 'office_details.camp_base',
      render: (text, record) => record.office_details ? record.office_details.camp_base : 'N/A',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Office Address"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
         
            <Button
              type=""
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            
            <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => (record.office_details.camp_base || '').toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Unit',
      dataIndex: 'unit_details.unit_name',
      key: 'unit_details.unit_name',
      render: (text, record) => record.unit_details ? record.unit_details.unit_name : 'N/A',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Office Address"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
         
            <Button
              type=""
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            
            <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => (record.unit_details.unit_name || '').toLowerCase().includes(value.toLowerCase()),
    },
    {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        render: (_, record) => (
            <Space>
                <Link to={"/fleet/vehicles/profile"} state={{ vehicle: record }}>
                    <Button  icon={<AiOutlineEye />} size="small">
                        Profile
                    </Button>
                </Link>
                <Link to={"/fleet/vehicles/update-vehicle"} state={{ vehicle: record }}>
                  <Button icon={<AiOutlineEdit />} size="small" >
                      Update
                  </Button>
                </Link>
                <Popconfirm
                    title="Are you sure to delete this vehicle?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger icon={<DeleteOutlined />} size="small">
                    Delete
                    </Button>
                </Popconfirm>
               
                 </Space>
        ),
      },
  ];


  return (
    <div className="vehiclesTableContainer">
      {loading ? (  <Spin size="large" /> ): (
      <Table  scroll={{ x: 2000, y: 650 }}   dataSource={filteredData.length ? filteredData : vehiclesData} columns={columns} rowKey="id" />
      )}
    </div>
  )
}
