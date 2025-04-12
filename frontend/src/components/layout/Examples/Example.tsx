'use client'

import React, { useRef } from 'react';
import Modal from '../Modal/Modal';
import { useModal } from '@/lib/hooks/useModal';

const ExamplePage: React.FC = () => {
  const { isOpen, open, close } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold">Modal Example</h1>
        
        <button
          onClick={open}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Open Modal
        </button>

        <Modal
          isOpen={isOpen}
          onClose={close}
          title="Example Modal"
          closeOnOutsideClick
          closeOnEsc
        //   initialFocusRef={inputRef}
          overlayClassName="backdrop-blur-sm"
          className="max-w-lg"
          modalContentClassName="space-y-4"
        >
          <p className="text-gray-700">
            This is a fully accessible modal component with proper focus management.
          </p>
          
          <div className="space-y-2">
            <label htmlFor="modal-input" className="block text-sm font-medium text-gray-700">
              Sample Input (auto-focused)
            </label>
            <input
              ref={inputRef}
              id="modal-input"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type something..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={close}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Action confirmed!');
                close();
              }}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ExamplePage;