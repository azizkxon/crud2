import axios from "axios";

const API_BASE_URL = "http://45.92.173.46:5050/api/Contacts";

export interface Contact {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/GetAllContacts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export const createContact = async (contact: Omit<Contact, "id">): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/CreateContact`, contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

export const deleteContact = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/DeleteContact`, { params: { contactID: id } });
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};

export const updateContact = async (id: number, updatedData: Contact): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/UpdateContact`, { id, ...updatedData });
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};
