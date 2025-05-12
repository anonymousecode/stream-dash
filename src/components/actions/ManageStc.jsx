'use client'

import React, { useState } from 'react'

const dummyIds = ['STC001', 'STC002', 'STC003', 'STC004','STC005']

const ManageStc = () => {
  const today = new Date().toISOString().split('T')[0]

  const [stcData, setStcData] = useState([
    { id: 'STC001', name: 'Alice Johnson', email: 'alice@example.com', phone: '9876543210', from: '2024-07-01', to: '2024-07-15' },
    { id: 'STC002', name: 'Bob Smith', email: 'bob@example.com', phone: '9123456789', from: '2024-08-10', to: '2024-09-05' },
    { id: 'STC003', name: 'Charlie Lee', email: 'charlie@example.com', phone: '9012345678', from: '2024-10-01', to: null } // Active STC
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [newStc, setNewStc] = useState({ id: '', name: '', email: '', phone: '' })

  const handleAddStc = () => {
    if (!newStc.id || !newStc.name || !newStc.email || !newStc.phone) return
    const alreadyActive = stcData.some(item => item.to === null)
    if (alreadyActive) {
      alert('Remove current STC before adding a new one.')
      return
    }
    setStcData(prev => [
      ...prev,
      { ...newStc, from: today, to: null }
    ])
    setShowAddModal(false)
    setNewStc({ id: '', name: '', email: '', phone: '' })
  }

  const handleRemoveStc = () => {
    setStcData(prev =>
      prev.map(stc =>
        stc.to === null ? { ...stc, to: today } : stc
      )
    )
  }

  return (
    <div className="container py-3 rounded bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Manage STC</h4>
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-primary" onClick={() => setShowAddModal(true)}>Add STC</button>
          <button className="btn btn-sm btn-danger" onClick={handleRemoveStc}>Remove STC</button>
        </div>
      </div>

      {stcData.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Unique ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>From (Date)</th>
                <th>To (Date)</th>
              </tr>
            </thead>
            <tbody>
              {stcData.map((stc, index) => (
                <tr key={index}>
                  <td>{stc.id}</td>
                  <td>{stc.name}</td>
                  <td>{stc.email}</td>
                  <td>{stc.phone}</td>
                  <td>{stc.from}</td>
                  <td>{stc.to || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-muted">No STC records found.</div>
      )}

      {/* Add STC Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add STC</h5>
                <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <label className="form-label">Unique ID</label>
                  <select className="form-select"
                    value={newStc.id}
                    onChange={(e) => setNewStc({ ...newStc, id: e.target.value })}>
                    <option value="">Select</option>
                    {dummyIds.map(id => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input className="form-control" value={newStc.name} onChange={(e) => setNewStc({ ...newStc, name: e.target.value })} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input className="form-control" value={newStc.email} onChange={(e) => setNewStc({ ...newStc, email: e.target.value })} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Phone</label>
                  <input className="form-control" value={newStc.phone} onChange={(e) => setNewStc({ ...newStc, phone: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleAddStc}>Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageStc
