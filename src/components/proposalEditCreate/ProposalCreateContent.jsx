'use client'
import React, { useState } from 'react'
import SelectDropdown from '@/components/shared/SelectDropdown'
import MultiSelectTags from '@/components/shared/MultiSelectTags'
import MultiSelectImg from '@/components/shared/MultiSelectImg'
import DatePicker from 'react-datepicker'
import useDatePicker from '@/hooks/useDatePicker'
import {
  propasalLeadOptions,
  taskAssigneeOptions,
  taskLabelsOptions,
} from '@/utils/options'
import useLocationData from '@/hooks/useLocationData'
import Loading from '@/components/shared/Loading'
import AddProposal from './AddProposal'

const previtems = [
  {
    id: 1,
    product: "",
    qty: 0,
    price: 0
  },
]

const ProposalCreateContent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { startDate, setStartDate, renderFooter } = useDatePicker();
  const { countries, states, cities, loading } = useLocationData();

  const handleSave = () => {
    // You can collect and validate your form data here.
    alert("Proposal saved! (you can replace this with actual logic)");
  }

  return (
    <>
      {loading && <Loading />}

      <div className="col-xl-12">
        <div className="card stretch stretch-full">
          <div className="card-body">

            {/* Project Title */}
            <div className="mb-4">
              <label className="form-label">Project Title <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="Project Title" />
            </div>

            {/* Project Goal */}
            <div className="mb-4">
              <label className="form-label">Project Goal <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="Project Goal" />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label">Description <span className="text-danger">*</span></label>
              <textarea className="form-control" placeholder="Enter description here" rows={4} />
            </div>

            {/* Task */}
            <div className="mb-4">
              <label className="form-label">Task <span className="text-danger">*</span></label>
              <input type="text" className="form-control" placeholder="Task" />
            </div>

            {/* School */}
            <div className="mb-4">
              <label className="form-label">School <span className="text-danger">*</span></label>
              <select className="form-control">
                <option value="">Select School</option>
                <option value="school1">School 1</option>
                <option value="school2">School 2</option>
                <option value="school3">School 3</option>
              </select>
            </div>

            {/* District */}
            <div className="mb-4">
              <label className="form-label">District <span className="text-danger">*</span></label>
              <select className="form-control">
                <option value="">Select District</option>
                <option value="district1">Kannur</option>
                <option value="district2">Alappuzha</option>
                <option value="district3">Ernakulam</option>
                <option value="district4">Palakkad</option>
              </select>
            </div>

            {/* BRC */}
            <div className="mb-4">
              <label className="form-label">BRC <span className="text-danger">*</span></label>
              <select className="form-control">
                <option value="">Select BRC</option>
                <option value="brc1">BRC 1</option>
                <option value="brc2">BRC 2</option>
                <option value="brc3">BRC 3</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="form-label">Upload Images</label>
              <input type="file" className="form-control" accept="image/*" multiple />
            </div>

            {/* Lead Dropdown */}
            <div className="mb-4">
              <label className="form-label">Lead <span className="text-danger">*</span></label>
              <SelectDropdown
                options={propasalLeadOptions}
                selectedOption={selectedOption}
                defaultSelect="ui"
                onSelectOption={setSelectedOption}
              />
            </div>

            {/* Start Date */}
            <div className="row">
              <div className="col-lg-6 mb-4">
                <label className="form-label">Start <span className="text-danger">*</span></label>
                <div className='input-group date'>
                  <DatePicker
                    placeholderText='Pick start date'
                    selected={startDate}
                    showPopperArrow={false}
                    onChange={(date) => setStartDate(date)}
                    className='form-control'
                    popperPlacement="bottom-start"
                    calendarContainer={({ children }) => (
                      <div className='bg-white react-datepicker'>
                        {children}
                        {renderFooter("start")}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="form-label">Tags:</label>
              <MultiSelectTags options={taskLabelsOptions} placeholder={""} />
            </div>

            {/* Members */}
            <div className="mb-4">
              <label className="form-label">Members:</label>
              <MultiSelectImg options={taskAssigneeOptions} placeholder={""} />
            </div>

            {/* SAVE BUTTON */}
            <div className="text-end mt-4">
              <button
                onClick={handleSave}
                className="btn"
                style={{
                  backgroundColor: '#FFC324',
                  color: 'white',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      </div>

      <AddProposal previtems={previtems} />
    </>
  )
}

export default ProposalCreateContent
