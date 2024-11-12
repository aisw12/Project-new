'use client'; // Mark this as a client component

import React, { useState } from 'react';
import { Table, Button, Popconfirm, Input, Modal, Form, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { addRecord, editRecord, deleteRecord } from '../../../redux/actions';
import { DataType } from '../../../redux/types';

const TableCRUD: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state);  // Get the data from Redux state
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Handle Add (Create)
  const handleAdd = () => {
    setIsModalVisible(true);
    setEditingRecord(null);  // Set to null for creating a new record
    form.resetFields();
  };

  // Handle Edit (Update)
  const handleEdit = (record: DataType) => {
    setIsModalVisible(true);
    setEditingRecord(record);
    form.setFieldsValue(record);  // Set form fields with the record data
  };

  // Handle Delete
  const handleDelete = (key: string) => {
    dispatch(deleteRecord(key));  // Dispatch delete action
  };

  // Handle Save (Add or Edit)
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        // Update existing record
        dispatch(editRecord({ ...editingRecord, ...values }));
      } else {
        // Create new record
        dispatch(addRecord({ ...values, key: (data.length + 1).toString() }));
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  // Table columns
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
     
      <Table columns={columns} dataSource={data} rowKey="key" />
      <Modal
        title={editingRecord ? 'Edit Record' : 'Add New Record'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="recordForm"
          onFinish={handleSave} // Use onFinish instead of onClick for saving form
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please input the age!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add New Record
      </Button>
    </div>
  );
};

export default TableCRUD;
