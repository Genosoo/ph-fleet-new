import { useEffect, useState } from "react";
import { Table, Input, Button, Space,  Popconfirm} from "antd";
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import useDataStore from "../../../context/useDataStore";
import GetToken from "../../../components/token/GetToken";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function OfficesTable() {
  const { officesData, fetchData, deleteOffice } = useDataStore();
  const [filteredData, setFilteredData] = useState([]);
  const csrfToken = GetToken()

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleDelete = async (officeId) => {
    try {
      await deleteOffice(officeId, csrfToken);
      setFilteredData([])
    } catch (error) {
      console.error('Error deleting office:', error);
    }
  };


  
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setFilteredData(
      officesData.filter((item) =>
        item.office_code.toLowerCase().includes(selectedKeys[0].toLowerCase()) ||
        item.office_name.toLowerCase().includes(selectedKeys[0].toLowerCase()) ||
        item.office_address.toLowerCase().includes(selectedKeys[0].toLowerCase())
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
      title: 'Office Code',
      dataIndex: 'office_code',
      key: 'office_code',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Office Code"
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
    
      title: 'Office Name',
      dataIndex: 'office_name',
      key: 'office_name',
      showSorterTooltip: {
        target: 'full-header',
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Office Name"
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
      onFilter: (value, record) => record.office_name.toLowerCase().includes(value.toLowerCase()),
      sorter: (a, b) => a.office_name.length - b.office_name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Office Address',
      dataIndex: 'office_address',
      key: 'office_address',
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
      onFilter: (value, record) => record.office_address.toLowerCase().includes(value.toLowerCase()),
    },
    {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        render: (_, record) => (
            <Space>
                <Link to={"/fleet/offices/profile"} state={{ office: record }}>
                    <Button  icon={<AiOutlineEye />} size="small">
                        Profile
                    </Button>
                </Link>
                <Link to={"/fleet/offices/update-office"} state={{ office: record }}>
                  <Button icon={<AiOutlineEdit />} size="small" >
                      Update
                  </Button>
                </Link>
                <Popconfirm
                    title="Are you sure to delete this office?"
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
    <div className="officesTableContainer">
      <Table  scroll={{ x: 1500, y: 650 }}   dataSource={filteredData.length ? filteredData : officesData} columns={columns} rowKey="id" />
    </div>
  );
}

