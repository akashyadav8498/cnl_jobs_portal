const CompanyProfile = require("../models/CompanyProfile");
const CompanyCategories = require("../models/CompanyCategories");

exports.getCompanyCategories = async (req, res) => {
  try {
    const companyCategories = await CompanyCategories.findAll();

    return res.json({
      success: true,
      companyCategories: companyCategories,
    });
  } catch (err) {
    console.error("Error fetching company categories:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getCompanyDetails = async (req, res) => {
  try {
    const hr_profile_id = req.session.hrProfileId;

    const companyDetails = await CompanyProfile.findOne({
      where: { hr_profile_id },
      include: [
        {
          model: CompanyCategories,
          as: "companyCategories",
        },
      ],
    });

    return res.json({
      success: true,
      companyDetails: companyDetails,
    });
  } catch (err) {
    console.error("Error fetching company details:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateCompanyDetails = async (req, res) => {
  try {
    const companyData = req.body;
    await CompanyProfile.update(
      {
        hr_profile_id: companyData.hr_profile_id,
        name: companyData.name,
        founded_year: companyData.founded_year,
        contact: companyData.contact,
        email: companyData.email,
        website: companyData.website,
        category_id:
          companyData.category_id === "" ? null : companyData.category_id,
        street_address: companyData.street_address,
        location: companyData.location,
        description: companyData.description,
        updatedAt: new Date(),
      },
      { where: { id: req.session.companyId } }
    );

    return res.json({
      success: true,
      message: "Company profile updated successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Company Profile could not be updated. Please try again.",
    });
  }
};
