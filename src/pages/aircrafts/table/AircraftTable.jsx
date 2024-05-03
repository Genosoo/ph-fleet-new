import { useEffect, useState } from "react";
import { Table, Input, Button, Space,  Popconfirm} from "antd";
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import useDataStore from "../../../context/useDataStore";
import GetToken from "../../../components/token/GetToken";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function AircraftTable() {
  const { aircraftData, fetchData, deleteAircraft } = useDataStore();
  const [filteredData, setFilteredData] = useState([]);
  const csrfToken = GetToken()

  console.log("Aircraft Data:", aircraftData)

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleDelete = async (officeId) => {
    try {
      await deleteAircraft(officeId, csrfToken);
      setFilteredData([])
    } catch (error) {
      console.error('Error deleting office:', error);
    }
  };


  
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setFilteredData(
      aircraftData.filter((item) =>
        item.unit_id2.toLowerCase().includes(selectedKeys[0].toLowerCase()) ||
        item.aircraft_name.toLowerCase().includes(selectedKeys[0].toLowerCase()) ||
        item.aircraft_type_details?.type_name.toLowerCase().includes(selectedKeys[0].toLowerCase()) ||
        item.unit_details?.unit_name.toLowerCase().includes(selectedKeys[0].toLowerCase()) ||
        item.wingspan.toLowerCase().includes(selectedKeys[0].toLowerCase()) ||
        item.fuel_capacity.toLowerCase().includes(selectedKeys[0].toLowerCase())      
      )
    );
  };
  
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
    setFilteredData([]); 
  };

 

  const columns = [
    {
      title: 'Unit ID',
      dataIndex: 'unit_id2',
      key: 'unit_id2',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Unit ID"
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
      onFilter: (value, record) => (record.unit_id2 || '').toLowerCase().includes(value.toLowerCase()),
    },
    
    {
    
      title: 'Aircraft Name',
      dataIndex: 'aircraft_name',
      key: 'aircraft_name',
      showSorterTooltip: {
        target: 'full-header',
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Aircraft Name"
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
      onFilter: (value, record) => record.aircraft_name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Aircraft Type',
      dataIndex: 'aircraft_type_details.type_name',
      key: 'aircraft_type_details.type_name',
      render: (text, record) => record.aircraft_type_details ? record.aircraft_type_details.type_name : 'N/A',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Aircraft Type"
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
      onFilter: (value, record) => record.aircraft_type_details.type_name.toLowerCase().includes(value.toLowerCase()),
    },
    {
        title: 'Unit',
        dataIndex: 'unit_details.unit_name',
        key: 'unit_details.unit_name',
        render: (text, record) => record.unit_details ? record.unit_details?.unit_name : 'N/A',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search Unit"
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
        onFilter: (value, record) => record.unit_details?.unit_name.toLowerCase().includes(value.toLowerCase()),
      },
      {
        title: 'Wing span',
        dataIndex: 'wingspan',
        key: 'wingspan',
        render: (text, record) => record.wingspan ? record.wingspan : 'N/A',
        showSorterTooltip: {
          target: 'full-header',
        },
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search Wing span"
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
        onFilter: (value, record) => record.wingspan.toLowerCase().includes(value.toLowerCase()),
      },
      {
        title: 'Fuel Capacity',
        dataIndex: 'fuel_capacity',
        key: 'fuel_capacity',
        render: (text, record) => record.fuel_capacity ? record.fuel_capacity : 'N/A',
        showSorterTooltip: {
          target: 'full-header',
        },
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search Fuel Capacity"
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
        onFilter: (value, record) => record.fuel_capacity.toLowerCase().includes(value.toLowerCase()),
      },
      {
        title: 'Crew',
        dataIndex: 'crew',
        key: 'crew',
        render: (text, record) => record.crew ? record.crew : 'N/A',
      },
    {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        render: (_, record) => (
            <Space >
                <Link to={"/fleet/aircrafts/profile"} state={{ aircraft: record }}>
                    <Button  icon={<AiOutlineEye />} size="small">
                        Profile
                    </Button>
                </Link>
                <Link to={"/fleet/aircrafts/update-aircraft"} state={{ aircraft: record }}>
                  <Button icon={<AiOutlineEdit />} size="small" >
                      Update
                  </Button>
                </Link>
                <Popconfirm
                    title="Are you sure to delete this aircraft?"
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
    <div className="aircraftTableContainer">
      <Table  scroll={{ x: 2000, y: 650 }}   dataSource={filteredData.length ? filteredData : aircraftData} columns={columns} rowKey="id" />
    </div>
  );
}

