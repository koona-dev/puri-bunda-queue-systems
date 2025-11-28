"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _common = require("@nestjs/common");
const _drizzleorm = require("drizzle-orm");
const _nodepostgres = require("drizzle-orm/node-postgres");
const _converter = require("../../utils/converter");
const _generatecode = require("../../utils/generate-code");
const _priorityenum = require("./utils/priority.enum");
const _queuetypeenum = require("./utils/queue-type.enum");
const _referencetypeenum = require("./utils/reference-type.enum");
const _servicetype = require("./utils/service-type");
const _queuestatusenum = require("./utils/queue-status.enum");
const _queueschema = require("../../database/schemas/queue.schema");
const _patientclassenum = require("../master/utils/patient-class.enum");
const _patienttypeenum = require("../master/utils/patient-type.enum");
const _genderenum = require("../master/utils/gender.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let QueuesService = class QueuesService {
    // ===========[Queries]===========
    async findOne(query) {
        const queueRecord = await this.db.query.queues.findFirst({
            with: {
                calls: true,
                patient: true,
                staff: true,
                clinic: true,
                doctor: true
            },
            where: (queue, { eq, and })=>{
                const conditions = [];
                if (query.id) conditions.push(eq(queue.id, query.id));
                if (query.patientId) conditions.push(eq(queue.patientId, query.patientId));
                if (query.clinicId) conditions.push(eq(queue.clinicId, query.clinicId));
                if (query.doctorId) conditions.push(eq(queue.doctorId, query.doctorId));
                if (query.staffId) conditions.push(eq(queue.staffId, query.staffId));
                if (query.queueNumber) conditions.push(eq(queue.queueNumber, query.queueNumber));
                if (query.createdAt) conditions.push(eq(queue.createdAt, query.createdAt));
                return conditions.length > 0 ? and(...conditions) : undefined;
            }
        });
        if (!queueRecord) {
            return null;
        }
        const { calls, patient, staff, clinic, doctor, ...queue } = queueRecord;
        const patientEntity = {
            ...patient,
            patientClass: (0, _converter.toEnum)(patient.patientClass, Object.values(_patientclassenum.PatientClass)),
            patientType: (0, _converter.toEnum)(patient.patientType, Object.values(_patienttypeenum.PatientType)),
            gender: (0, _converter.toEnum)(patient.gender, Object.values(_genderenum.Gender))
        };
        const queueEntity = {
            ...queue,
            priority: (0, _converter.toEnum)(queue.priority, Object.values(_priorityenum.Priority)),
            queueType: (0, _converter.toEnum)(queue.queueType, Object.values(_queuetypeenum.QueueType)),
            referenceType: (0, _converter.toEnum)(queue.referenceType, Object.values(_referencetypeenum.ReferenceType)),
            serviceType: (0, _converter.toEnum)(queue.serviceType, Object.values(_servicetype.ServiceType)),
            status: (0, _converter.toEnum)(queue.status, Object.values(_queuestatusenum.QueueStatus))
        };
        return {
            queue: queueEntity,
            queueCall: calls[0],
            patient: patientEntity,
            staff,
            clinic,
            doctor
        };
    }
    async findMany(query) {
        const queueList = await this.db.query.queues.findMany({
            with: {
                calls: true,
                patient: true,
                staff: true,
                clinic: true,
                doctor: true
            },
            where: (queue, { eq, and })=>{
                const conditions = [];
                if (query.queueType) conditions.push(eq(queue.queueType, query.queueType));
                if (query.priority) conditions.push(eq(queue.priority, query.priority));
                if (query.serviceType) conditions.push(eq(queue.serviceType, query.serviceType));
                if (query.referenceType) conditions.push(eq(queue.referenceType, query.referenceType));
                if (query.reservationDate) conditions.push(eq(queue.reservationDate, query.reservationDate));
                if (query.status) conditions.push(eq(queue.status, query.status));
                return and(...conditions);
            },
            orderBy: (queue, { asc })=>[
                    (0, _drizzleorm.sql)`
    CASE 
      WHEN ${queue.priority} = ${_priorityenum.Priority.Emergency} THEN 0
      WHEN ${queue.priority} = ${_priorityenum.Priority.Urgent} THEN 1
      ELSE 2 
    END
  `,
                    (0, _drizzleorm.sql)`
    CASE 
      WHEN ${queue.serviceType} = ${_servicetype.ServiceType.ugd} THEN 0
      WHEN ${queue.serviceType} = ${_servicetype.ServiceType.rawatInap} THEN 1
      WHEN ${queue.serviceType} = ${_servicetype.ServiceType.rawatJalan} THEN 2
      ELSE 3
    END
  `,
                    asc(queue.reservationDate),
                    asc(queue.preferredTime)
                ]
        });
        const queueListEntity = queueList.map((record)=>{
            const { calls, patient, staff, clinic, doctor, ...queue } = record;
            const patientEntity = {
                ...patient,
                patientClass: (0, _converter.toEnum)(patient.patientClass, Object.values(_patientclassenum.PatientClass)),
                patientType: (0, _converter.toEnum)(patient.patientType, Object.values(_patienttypeenum.PatientType)),
                gender: (0, _converter.toEnum)(patient.gender, Object.values(_genderenum.Gender))
            };
            const queueEntity = {
                ...queue,
                priority: (0, _converter.toEnum)(queue.priority, Object.values(_priorityenum.Priority)),
                queueType: (0, _converter.toEnum)(queue.queueType, Object.values(_queuetypeenum.QueueType)),
                referenceType: (0, _converter.toEnum)(queue.referenceType, Object.values(_referencetypeenum.ReferenceType)),
                serviceType: (0, _converter.toEnum)(queue.serviceType, Object.values(_servicetype.ServiceType)),
                status: (0, _converter.toEnum)(queue.status, Object.values(_queuestatusenum.QueueStatus))
            };
            return {
                queue: queueEntity,
                queueCall: calls[0],
                patient: patientEntity,
                staff,
                clinic,
                doctor
            };
        });
        return queueListEntity;
    }
    // ===========[Commands]===========
    async create(data) {
        try {
            const queueData = {
                ...data,
                queueNumber: await (0, _generatecode.generateCode)(this.db, _queueschema.queues, "queueNumber", data.queueType.charAt(0)),
                status: _queuestatusenum.QueueStatus.Waiting
            };
            const queueRecord = await this.db.insert(_queueschema.queues).values(queueData).returning();
            console.log(queueRecord[0]);
            if (!queueRecord[0]) return;
            const queueEntity = {
                ...queueRecord[0],
                priority: (0, _converter.toEnum)(queueRecord[0].priority, Object.values(_priorityenum.Priority)),
                queueType: (0, _converter.toEnum)(queueRecord[0].queueType, Object.values(_queuetypeenum.QueueType)),
                referenceType: (0, _converter.toEnum)(queueRecord[0].referenceType, Object.values(_referencetypeenum.ReferenceType)),
                serviceType: (0, _converter.toEnum)(queueRecord[0].serviceType, Object.values(_servicetype.ServiceType)),
                status: (0, _converter.toEnum)(queueRecord[0].status, Object.values(_queuestatusenum.QueueStatus))
            };
            return queueEntity;
        } catch (error) {}
    }
    async update(data) {
        try {
            let obj = data;
            if (data.status === _queuestatusenum.QueueStatus.Done) {
                {
                    obj = {
                        ...data,
                        status: data.status,
                        completedAt: new Date()
                    };
                }
            }
            const queueRecord = await this.db.update(_queueschema.queues).set(obj).where((0, _drizzleorm.eq)(_queueschema.queues.id, data.id)).returning();
            if (queueRecord[0].status == _queuestatusenum.QueueStatus.Done) {
                const nextQueue = await this._getNextQueue();
                await this.db.update(_queueschema.queues).set({
                    status: _queuestatusenum.QueueStatus.Called,
                    calledAt: new Date()
                }).where((0, _drizzleorm.and)((0, _drizzleorm.eq)(_queueschema.queues.id, nextQueue?.id)));
                await this.db.insert(_queueschema.queueCalls).values({
                    queueId: nextQueue?.id,
                    staffId: nextQueue?.staffId
                });
            }
            const queueEntity = {
                ...queueRecord[0],
                priority: (0, _converter.toEnum)(queueRecord[0].priority, Object.values(_priorityenum.Priority)),
                queueType: (0, _converter.toEnum)(queueRecord[0].queueType, Object.values(_queuetypeenum.QueueType)),
                referenceType: (0, _converter.toEnum)(queueRecord[0].referenceType, Object.values(_referencetypeenum.ReferenceType)),
                serviceType: (0, _converter.toEnum)(queueRecord[0].serviceType, Object.values(_servicetype.ServiceType)),
                status: (0, _converter.toEnum)(queueRecord[0].status, Object.values(_queuestatusenum.QueueStatus))
            };
            return queueEntity;
        } catch (error) {}
    }
    async delete(id) {
        try {
            const queueRecord = await this.db.delete(_queueschema.queues).where((0, _drizzleorm.eq)(_queueschema.queues.id, id)).returning();
            if (!queueRecord) {
                return false;
            }
            return true;
        } catch (error) {}
    }
    async _getNextQueue() {
        const waitingQueuesList = await this.db.select().from(_queueschema.queues).where((0, _drizzleorm.and)((0, _drizzleorm.eq)(_queueschema.queues.status, _queuestatusenum.QueueStatus.Waiting))).orderBy((0, _drizzleorm.sql)`
    CASE 
      WHEN ${_queueschema.queues.priority} = ${_priorityenum.Priority.Emergency} THEN 0
      WHEN ${_queueschema.queues.priority} = ${_priorityenum.Priority.Urgent} THEN 1
      ELSE 2 
    END
  `, (0, _drizzleorm.sql)`
    CASE 
      WHEN ${_queueschema.queues.serviceType} = ${_servicetype.ServiceType.ugd} THEN 0
      WHEN ${_queueschema.queues.serviceType} = ${_servicetype.ServiceType.rawatInap} THEN 1
      WHEN ${_queueschema.queues.serviceType} = ${_servicetype.ServiceType.rawatJalan} THEN 2
      ELSE 3
    END
  `, (0, _drizzleorm.asc)(_queueschema.queues.reservationDate), (0, _drizzleorm.asc)(_queueschema.queues.preferredTime));
        if (waitingQueuesList.length === 0) {
            return null;
        }
        // Separate by type (after priority)
        const reservation = waitingQueuesList.filter((q)=>q.queueType === _queuetypeenum.QueueType.Reservation);
        const walkin = waitingQueuesList.filter((q)=>q.queueType === _queuetypeenum.QueueType.Walkin);
        // Implement 2R:1W algorithm
        const result = [];
        let rIndex = 0;
        let wIndex = 0;
        while(rIndex < reservation.length || wIndex < walkin.length){
            // Add 2 reservation
            if (rIndex < reservation.length) result.push(reservation[rIndex++]);
            if (rIndex < reservation.length) result.push(reservation[rIndex++]);
            // Add 1 walkin
            if (wIndex < walkin.length) result.push(walkin[wIndex++]);
        }
        if (result.length === 0) {
            return null;
        }
        const queueEntity = {
            ...result[0],
            priority: (0, _converter.toEnum)(result[0].priority, Object.values(_priorityenum.Priority)),
            queueType: (0, _converter.toEnum)(result[0].queueType, Object.values(_queuetypeenum.QueueType)),
            referenceType: (0, _converter.toEnum)(result[0].referenceType, Object.values(_referencetypeenum.ReferenceType)),
            serviceType: (0, _converter.toEnum)(result[0].serviceType, Object.values(_servicetype.ServiceType)),
            status: (0, _converter.toEnum)(result[0].status, Object.values(_queuestatusenum.QueueStatus)),
            queueCall: result[0].calls[0]
        };
        return queueEntity;
    }
    constructor(db){
        this.db = db;
    }
};
QueuesService = _ts_decorate([
    _ts_param(0, (0, _common.Inject)("DB_PG")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nodepostgres.NodePgDatabase === "undefined" ? Object : _nodepostgres.NodePgDatabase
    ])
], QueuesService);
const _default = QueuesService;

//# sourceMappingURL=queues.service.js.map