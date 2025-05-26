'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { get_data, update } from '@/api/methods';
import Loading from '@/components/shared/Loading';

const FacilityEdit = () => {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    lab_type: '',
    brc: '',
    district: ''
  });

  const [errors, setErrors] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  // Fetch facility data by ID
  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        const res = await get_data('Facility', '*', [['name', '=', id]]);
        if (res?.length) {
          setForm(res[0]);
        }
      } catch (err) {
        console.error('Failed to fetch facility data', err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchFacilityData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const requiredFields = ['title', 'lab_type', 'brc', 'district'];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!form[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await update('Facility', form.name, form);
      alert('Facility updated successfully.');
      router.push('/facilities/myfacilities');
    } catch (err) {
      console.error('Update failed:', err);
      alert(`Update failed: ${err.message || 'Unknown error'}`);
    }
  };

  if (loadingData) return <Loading />;

  return (
    <div className="container my-4 bg-white p-4 rounded shadow-sm">
      <h3>Edit Facility</h3>
      <form onSubmit={handleSubmit}>
        {/* Facility Name */}
        <div className="mb-3">
          <label className="form-label">Facility Name <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        {/* Lab Type */}
        <div className="mb-3">
          <label className="form-label">Lab Type <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.lab_type ? 'is-invalid' : ''}`}
            name="lab_type"
            value={form.lab_type}
            onChange={handleChange}
          />
          {errors.lab_type && <div className="invalid-feedback">{errors.lab_type}</div>}
        </div>

        {/* BRC */}
        <div className="mb-3">
          <label className="form-label">BRC <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.brc ? 'is-invalid' : ''}`}
            name="brc"
            value={form.brc}
            onChange={handleChange}
          />
          {errors.brc && <div className="invalid-feedback">{errors.brc}</div>}
        </div>

        {/* District */}
        <div className="mb-3">
          <label className="form-label">District <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.district ? 'is-invalid' : ''}`}
            name="district"
            value={form.district}
            onChange={handleChange}
          />
          {errors.district && <div className="invalid-feedback">{errors.district}</div>}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Update Facility</button>
        </div>
      </form>
    </div>
  );
};

export default FacilityEdit;
