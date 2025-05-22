import { Database, BarChart, BookOpen, Filter, Layers } from "lucide-react";

export const datasetStats = [
  { name: "Total Records", value: "76,518" },
  { name: "Features", value: "36" },
  { name: "Target Classes", value: "3" },
];

export const impactData = [
  { name: "Lost Tuition Revenue", value: "$1.2B", source: "Education Data Initiative" },
  { name: "Unfilled Job Positions", value: "240K", source: "Georgetown CEW" },
  { name: "Average Debt with No Degree", value: "$13,500", source: "Federal Reserve" },
  { name: "Years of Potential Income Lost", value: "2-4", source: "BLS Analysis" },
];

export const dropoutData = [
  { year: "2018", rate: 24.5, source: "NCES" },
  { year: "2019", rate: 26.3, source: "NCES" },
  { year: "2020", rate: 32.1, source: "NCES" },
  { year: "2021", rate: 30.8, source: "ACE" },
  { year: "2022", rate: 28.4, source: "ACE" },
  { year: "2023", rate: 27.2, source: "JCSR" },
];

// EDA Visualizations
export const edaVisualizations = [
  {
    title: "Target Distribution",
    description: "The dataset shows 49.5% of students graduate, 33.1% drop out, and 17.4% remain enrolled, indicating a significant dropout challenge.",
    image: "/images/eda/target_distribution.png",
    icon: BarChart,
  },
  {
    title: "Scholarship Impact",
    description: "Students with scholarships have a higher graduation rate (63.5%) compared to those without (44.2%), suggesting financial support reduces dropout risk.",
    image: "/images/eda/scholarship_vs_target.png",
    icon: BookOpen,
  },
  {
    title: "Tuition Fees Status",
    description: "Students with up-to-date tuition fees have a 54.8% graduation rate, while those with overdue fees have a 75.2% dropout rate, highlighting financial barriers.",
    image: "/images/eda/tuition_vs_target.png",
    icon: Database,
  },
  {
    title: "Feature Importance",
    description: "Mutual Information scores highlight that curricular units (approved and grades) are the most predictive features, with scores up to 0.3214.",
    image: "/images/eda/mutual_info_scores.png",
    icon: Filter,
  },
  {
    title: "Feature Correlations",
    description: "Strong correlations exist between curricular units (approved and grades) across semesters, with coefficients up to 0.85, indicating consistent academic performance.",
    image: "/images/eda/correlation_matrix.png",
    icon: Layers,
  },
];

export const processingSteps = [
  {
    icon: Database,
    title: "Handling Missing Data",
    description: "Remove rows with missing data (0.0024% missing) and replace 'Unknown' values with the mode.",
    details: (
      <div className="text-sm text-green-700">
        <p><strong>Missing Data</strong>: 0.0024% → Removed rows.</p>
        <p><strong>Unknown Values</strong>: Replaced with mode in 'Father's qualification' and 'Mother's qualification'.</p>
        <p className="mt-2 italic">Result: No missing or 'Unknown' values.</p>
      </div>
    ),
    code: `
df_cleaned = df.dropna()
mode_father = df_cleaned[df_cleaned["Father's qualification"] != 'Unknown']["Father's qualification"].mode()[0]
df_cleaned["Father's qualification"] = df_cleaned["Father's qualification"].replace('Unknown', mode_father)
mode_mother = df_cleaned[df_cleaned["Mother's qualification"] != 'Unknown']["Mother's qualification"].mode()[0]
df_cleaned["Mother's qualification"] = df_cleaned["Mother's qualification"].replace('Unknown', mode_mother)
    `,
    image: "missing_data_visualization.png",
    imageDescription: "Bar chart showing the percentage of missing data before (0.0024%) and after (0%) cleaning.",
  },
  {
    icon: BarChart,
    title: "Scaling Numerical Features",
    description: "Use RobustScaler to scale numerical features, preserving meaningful outliers.",
    details: (
      <div className="text-sm text-green-700">
        <p><strong>Method</strong>: RobustScaler (median and IQR-based).</p>
        <p><strong>Features Scaled</strong>: Age at enrollment, Admission grade, etc.</p>
        <p className="mt-2 italic">Reason: Outliers are meaningful (e.g., older students, extreme grades).</p>
      </div>
    ),
    code: `
from sklearn.preprocessing import RobustScaler
scaler = RobustScaler()
df_scaled = df_cleaned.copy()
df_scaled[numerical_cols] = scaler.fit_transform(df_cleaned[numerical_cols])
    `,
    image: "scaling_boxplot.png",
    imageDescription: "Boxplot comparing 'Age at enrollment' distribution before and after scaling with RobustScaler.",
  },
  {
    icon: BookOpen,
    title: "Grouping and Encoding Features",
    description: "Group categorical features to reduce cardinality, then encode them for modeling.",
    details: (
      <div className="text-sm text-green-700">
        <p><strong>Grouped Features</strong>:</p>
        <ul className="list-disc list-inside">
          <li>Marital status: 6 → 4 groups (e.g., married_union)</li>
          <li>Nationality: 16 → 2 groups (Portuguese, Other)</li>
          <li>Application mode: 16 → 5 groups</li>
          <li>Course: 17 → 4 groups</li>
          <li>Qualifications: 17-29 → 3 groups (Ordinal)</li>
          <li>Occupations: 30-43 → 5 groups (One-Hot)</li>
        </ul>
        <p className="mt-2 italic">Encoded binary features (e.g., Gender: female → 0, male → 1).</p>
      </div>
    ),
    code: `
marital_map = {
    'single': 'single',
    'married': 'married_union',
    'facto union': 'married_union',
    'divorced': 'divorced_sep',
    'legally separated': 'divorced_sep',
    'widower': 'widower'
}
df_encoded['Marital_status_group'] = df_encoded['Marital status'].map(marital_map)
df_encoded = pd.get_dummies(df_encoded, columns=['Marital_status_group'], prefix='Marital', drop_first=True)

nationality_map = {
    'Portuguese': 'Portuguese',
    'Brazilian': 'Other',
    // ... other nationalities
}
df_encoded['Nationality_encoded'] = df_encoded['Nationality'].map(nationality_map).map({'Portuguese': 0, 'Other': 1})
    `,
    image: "encoding_countplot.png",
    imageDescription: "Countplot showing the distribution of 'Marital status' before and after grouping into 4 categories.",
  },
  {
    icon: Filter,
    title: "Feature Selection",
    description: "Remove low-importance features using Spearman correlation and Mutual Information.",
    details: (
      <div className="text-sm text-green-700">
        <p><strong>Criteria</strong>:</p>
        <ul className="list-disc list-inside">
          <li>Spearman |{'ρ'}| &lt; 0.075 (numerical)</li>
          <li>MI &lt; 0.001 (categorical)</li>
        </ul>
        <p><strong>Removed Features</strong>: Nationality_encoded, Unemployment rate, etc.</p>
        <p className="mt-2 italic">Result: Reduced noise, kept informative features.</p>
      </div>
    ),
    code: `
corr_series = df_work[num_cols].corrwith(df_work[TARGET_COL], method='spearman').abs().sort_values()
low_corr = corr_series[corr_series < CORR_THRESH].index.tolist()

mi_scores = mutual_info_regression(df_cat, df_work[TARGET_COL], random_state=RANDOM_STATE)
mi_series = pd.Series(mi_scores, index=df_cat.columns).sort_values()
low_mi = mi_series[mi_scores < MI_THRESH].index.tolist()

to_drop = low_corr + low_mi
df_reduced = df_work.drop(columns=to_drop)
    `,
    image: "spearman_barplot.png",
    imageDescription: "Barplot showing the absolute Spearman correlations of numerical features with the target variable.",
  },
  {
    icon: Layers,
    title: "Combining Features",
    description: "Combine Mother's and Father's qualifications into max_parent_qual.",
    details: (
      <div className="text-sm text-green-700">
        <p><strong>New Feature</strong>: max_parent_qual = max(Mother's, Father's qualification).</p>
        <p><strong>Spearman ρ</strong>: 0.092 (vs. 0.091 for Mother, 0.112 for Father).</p>
        <p><strong>R² Impact</strong>: Minimal loss (0.012 → 0.0081).</p>
        <p className="mt-2 italic">Dropped original columns to reduce multicollinearity.</p>
      </div>
    ),
    code: `
df_reduced['max_parent_qual'] = df_reduced[[MOTHER_COL, FATHER_COL]].max(axis=1)
rho_dict['max_parent_qual'], _ = st.spearmanr(df_reduced['max_parent_qual'], df_reduced[TARGET_COL])
df_reduced = df_reduced.drop(['Father_qualification_grouped', 'Mother_qualification_grouped'], axis=1)
    `,
    image: "qualification_barplot.png",
    imageDescription: "Barplot comparing Spearman correlations of Mother's, Father's, and max_parent_qual with the target.",
  },
];