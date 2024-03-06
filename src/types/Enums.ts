export enum DemandStatus {
  Pending = "Pendente",
  AwaitingApproval = "Aguardando Aprovação",
  Completed = "Entregue",
}

export enum MessageTypeEnum {
  Default = "default",
  RequestApproval = "request_approval",
  Approved = "approved",
  Completed = "completed",
}

export enum TaskStatus {
  Pending = "Pendente",
  AwaitingApproval = "Aguardando aprovação",
  Completed = "Concluído",
}

export enum UserTypes {
  Owner = "Sócio Proprietário",
  Leader = "Líder",
  Employee = "Funcionário",
  Freelancer = "Freelancer",
}