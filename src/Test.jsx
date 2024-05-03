import { useEffect, useState } from "react";
import { Table, Input, Button, Space, message, Popconfirm, Modal } from "antd";
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import useDataStore from "./context/useDataStore";
import GetToken from "./components/token/GetToken";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import "./css/index.css"

export default function Test() {
  const { officesData, fetchOfficeData, addOffice, deleteOffice } = useDataStore();
  const [officeName, setOfficeName] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [officeCode, setOfficeCode] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const csrfToken = GetToken()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchOfficeData();
  }, [fetchOfficeData]);


  const handleDelete = async (officeId) => {
    try {
      await deleteOffice(officeId, csrfToken);
      setFilteredData([])
    } catch (error) {
      console.error('Error deleting office:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (officeName.trim() === "" ) {
        message.error('Please enter office name');
        return;
    }

    if (officeAddress.trim() === "" ) {
        message.error('Please enter office address');
        return;
    }

    try {
      await addOffice(
        {
          office_name: officeName,
          office_address: officeAddress,
          office_code: officeCode
        },
        csrfToken
      );
      setOfficeName('');
      setOfficeAddress('');
      setOfficeCode('');
      setFilteredData([])
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const columns = [
    {
      title: 'Office Name',
      dataIndex: 'office_name',
      key: 'office_name',
      // Adding filter icon and search functionality
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
    },
    {
      title: 'Office Address',
      dataIndex: 'office_address',
      key: 'office_address',
    },
    {
      title: 'Office Code',
      dataIndex: 'office_code',
      key: 'office_code',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space>
                 <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
                 <Button  icon={<AiOutlineEye />} size="small">
                    Profile
                </Button>
                    <Button icon={<AiOutlineEdit />} size="small" onClick={showModal}>
                Update
            </Button>
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

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setFilteredData(officesData.filter((item) => item.office_name.toLowerCase().includes(selectedKeys[0].toLowerCase())));
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
    setFilteredData([]); 
  };

  return (
    <div className="p-10 flex flex-col font-manrope gap-5 ">
      <h1>Offices List</h1>
      <Table dataSource={filteredData.length ? filteredData : officesData} columns={columns} rowKey="id" />
      <form >
        <div>
          <label htmlFor="officeName">Office Name:</label>
          <input
            type="text"
            id="officeName"
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="officeAddress">Office Address:</label>
          <input
            type="text"
            id="officeAddress"
            value={officeAddress}
            onChange={(e) => setOfficeAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="officeCode">Office Code:</label>
          <input
            type="text"
            id="officeCode"
            value={officeCode}
            onChange={(e) => setOfficeCode(e.target.value)}
          />
        </div>
        <Button type="primary" onClick={handleSubmit}>Add Office</Button>
      </form>
    </div>
  );
}
